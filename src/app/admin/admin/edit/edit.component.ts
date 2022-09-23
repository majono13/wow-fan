import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil, tap } from 'rxjs'
import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from 'src/app/admin/publication.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  unsubiscribe$: Subject<any> = new Subject();
  categories: string[] = this.publiService.categories;
  publication!: Publication;

  formEditPublication: FormGroup;
  constructor(private fb: FormBuilder, private publiService: PublicationService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.getPublication(id);
  }

  async getPublication(id: string) {
    this.publiService.getPublicationById(id)
      .pipe(takeUntil(this.unsubiscribe$))
      .subscribe(p => {
        console.log(p)
        this.publication = p[0];
        this.loadDatasForm(p[0]);
      });
  }

  loadDatasForm(publication: Publication) {
    this.formEditPublication = this.fb.group({
      title: [publication?.title, [Validators.required, Validators.minLength(3)]],
      urlImg: [publication?.urlImg, [Validators.required, Validators.minLength(6)]],
      content: [publication?.content, [Validators.required, Validators.minLength(50)]],
      category: [publication?.category, [Validators.required]],
      origin: [publication?.origin, [Validators.required, Validators.minLength(3)]],
      featured: ['', [Validators.required]],
      published: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const publiEdited: Publication = this.creatNewPublication();

    this.publiService.editPublication(publiEdited)
      .then(() => {
        this.openDialog('<i class="bi bi-emoji-sunglasses-fill"></i>   Publicação editada com sucesso!');
        this.router.navigateByUrl('/admin/details/' + this.publication.url);
      })
      .catch((err) => '<i class="bi bi-emoji-dizzy-fill"></i> Ops! Algo deu erro, tente novamente ou contate um adiministrador!');
  }

  creatNewPublication(): Publication {
    return {
      ...this.formEditPublication.value,
      id: this.publication.id,
      url: this.publiService.createUrl(this.formEditPublication.value.title),
      published: this.formEditPublication.value.published == 1 ? true : false,
      featured: this.formEditPublication.value.featured == 1 ? true : false,
      order: this.publication.order,
      fac: this.publication.fac ? this.publication.fac : ''
    }
  }

  openDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: msg,

    });
  }

  exit() {
    this.router.navigateByUrl('/admin');
  }

  ngOnDestroy() {
    this.unsubiscribe$.complete();
  }
}
