import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  publication!: Publication;
  published: string = '';
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService, private route: ActivatedRoute) { }

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

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
