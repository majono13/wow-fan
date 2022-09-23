import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Subject, takeUntil, map } from 'rxjs';

import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from '../../publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  unsubscribe$: Subject<any> = new Subject();

  publications!: Publication[];
  publisheds: Publication[] = [];

  pageSliceAll: Publication[];
  pageSlicePublisheds: Publication[];

  constructor(private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublicationsAllPublication();
  }

  getPublicationsAllPublication() {
    this.publisService.getAllPublications()
      .pipe(takeUntil(this.unsubscribe$))

      .subscribe(publications => {
        this.publications = publications;

        this.pageSliceAll = this.publications?.slice(0, 5);

        this.getPublicationPublisheds();
      });
  }

  getPublicationPublisheds() {

    for (let p of this.publications) {
      if (p.published) this.publisheds.push(p);
    }

    this.pageSlicePublisheds = this.publisheds.slice(0, 5);
  }

  /******* Paginator *******/

  onPageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.publications.length) {
      endIndex = this.publications.length;
    }

    this.pageSliceAll = this.publications.slice(startIndex, endIndex);
    this.pageSlicePublisheds = this.publisheds.slice(startIndex, endIndex);
  }

  /***********/

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
}
