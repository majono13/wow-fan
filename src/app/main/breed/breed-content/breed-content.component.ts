import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subject, takeUntil, map } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-breed-content',
  templateUrl: './breed-content.component.html',
  styleUrls: ['./breed-content.component.scss']
})
export class BreedContentComponent implements OnInit {

  constructor(private publisService: PublicationService, private route: ActivatedRoute) { }


  publication!: Publication;
  publications: Publication[] = [];
  urlBreed: string = '';
  unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {

    this.getPublication();

    this.route.paramMap
      .subscribe(params => {
        this.urlBreed = params.get('url');
        this.getPublicationBreed();
      })
  }

  getPublication() {
    this.publisService.getPublications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((publi) => this.publications = publi);
  }

  getPublicationBreed() {

    for (let p of this.publications) {

      if (p.url === this.urlBreed) {
        this.publication = p;
        return;
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }



}
