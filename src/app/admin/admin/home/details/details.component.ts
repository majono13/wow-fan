import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  publication!: Publication;
  published: string = '';
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    this.publisService.getAllPublications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(p => this.getPublicationDetails(p));
  }

  getPublicationDetails(publi: Publication[]) {
    let urlLore = this.route.snapshot.paramMap.get('url');

    for (let p of publi) {

      if (p.url === urlLore) {
        this.publication = p;
        this.checkPublishedStatus();
        return;
      }
    }
  }

  checkPublishedStatus() {
    if (this.publication?.published) this.published = 'Publicado';
    else this.published = 'Não Publicado';
  }

  editStatusPublication(publication: Publication) {
    publication.published = !publication.published;

    this.publisService.editPublication(publication)
      .then((res) => this.openDialog(' <i class="bi bi-emoji-sunglasses-fill"></i>   O status da sua publicação foi mudado com sucesso!'))
      .catch((err) => '<i class="bi bi-emoji-dizzy-fill"></i> Ops! Algo deu erro, tente novamente ou contate um adiministrador!');
  }

  openDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: msg,
    });

  }


  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
