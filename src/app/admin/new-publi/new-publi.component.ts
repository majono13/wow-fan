import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { Publication } from 'src/app/models/publication.model';
import { SanackbarService } from 'src/app/shared/services/snackbar.service';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'app-new-publi',
  templateUrl: './new-publi.component.html',
  styleUrls: ['./new-publi.component.scss']
})
export class NewPubliComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  categories: string[] = this.publiService.categories;

  formPublication = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    urlImg: ['', [Validators.required, Validators.minLength(6)]],
    content: ['', [Validators.required, Validators.minLength(50)]],
    category: ['', [Validators.required]],
    origin: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder, private publiService: PublicationService, private sanackBar: SanackbarService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newPubli: Publication = {
      title: this.formPublication.value.title,
      urlImg: this.formPublication.value.urlImg,
      content: this.formPublication.value.content,
      category: this.formPublication.value.category,
      origin: this.formPublication.value.origin,
      published: false,
      id: '',
      url: this.createUrl()
    }

    console.log(newPubli)
    this.publiService.newPlublication(newPubli)
      .then(() => this.sanackBar.snackbarNotify('Publicação salva! Vá para a página principal para publicá-la'))
      .catch(() => this.sanackBar.snackbarNotify('Falha ao salvar publicação, tente novamente.'));

    this.clearFields();
  }

  createUrl(): string {
    const textUrl = this.formPublication.value.title;

    let url = textUrl.replace(/ /g, '-');

    return url.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  clearFields() {
    this.form.resetForm();
  }
}
