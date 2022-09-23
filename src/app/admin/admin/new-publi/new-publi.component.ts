import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs'
import { Dialog } from 'src/app/shared/services/dialog.service';

import { PublicationService } from '../../publication.service';

@Component({
  selector: 'app-new-publi',
  templateUrl: './new-publi.component.html',
  styleUrls: ['./new-publi.component.scss']
})
export class NewPubliComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  unsubiscribe$: Subject<any> = new Subject();
  categories: string[] = this.publiService.categories;
  order: Number = 0;

  formPublication = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    urlImg: ['', [Validators.required, Validators.minLength(6)]],
    content: ['', [Validators.required, Validators.minLength(50)]],
    category: ['', [Validators.required]],
    origin: ['', [Validators.required, Validators.minLength(3)]],
    featured: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private publiService: PublicationService, public dialog: Dialog) { }

  ngOnInit(): void {

    this.getOrder()
  }

  onSubmit() {
    this.formPublication.value.featured = this.getRadioValue();

    const newPubli = { ...this.formPublication.value, url: this.publiService.createUrl(this.formPublication.value.title), id: '', published: true, order: this.order };

    console.log(newPubli);

    this.publiService.newPlublication(newPubli)
      .then(() => {
        this.dialog.openDialog('<i class="bi bi-emoji-sunglasses-fill"></i> Nova Publicação Adicionada com sucesso!');
      })
      .catch((err) => this.dialog.openDialog('<i class="bi bi-emoji-dizzy-fill"></i> Ops! Algo deu erro, tente novamente ou contate um adiministrador!'));

    this.clearFields();
  }

  getRadioValue(): boolean {
    const published: boolean = this.formPublication.value.featured == 1 ? true : false;

    return published;
  }

  getOrder() {

    this.publiService.getAllPublications()
      .pipe(takeUntil(this.unsubiscribe$))
      .subscribe(res => this.order = res.length + 1);
  }

  clearFields() {
    this.form.resetForm();
  }


  ngOnDestroy() {
    this.unsubiscribe$.complete();
  }
}
