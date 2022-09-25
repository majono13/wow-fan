import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';
import { Dialog } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  publication!: Publication;
  published: string = '';
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService, private route: ActivatedRoute, private router: Router, public dialog: Dialog) { }

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

    this.router.navigateByUrl('/not-found');
  }

  checkPublishedStatus() {
    if (this.publication?.published) this.published = 'Publicado';
    else this.published = 'Não Publicado';
  }

  editStatusPublication(publication: Publication) {
    publication.published = !publication.published;

    this.publisService.editPublication(publication)
      .then((res) => this.dialog.openDialog(' <i class="bi bi-emoji-sunglasses-fill"></i>   O status da sua publicação foi mudado com sucesso!'))
      .catch((err) => this.dialog.openDialog('<i class="bi bi-emoji-dizzy-fill"></i> Ops! Algo deu erro, tente novamente ou contate um adiministrador!'));
  }


  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
