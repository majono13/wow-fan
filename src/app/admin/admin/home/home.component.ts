import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, map } from 'rxjs';
import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from '../../publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  publications!: Publication[];
  publisheds!: Publication[];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublicationsAllPublication();
    this.getPublicationPublisheds();
  }

  getPublicationsAllPublication() {
    this.publisService.getAllPublications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(publications => this.publications = publications);
  }

  getPublicationPublisheds() {
    this.publisService.getAllPublications()
      .pipe(takeUntil(this.unsubscribe$),
        map((results) => results.filter((publi) => publi.published === true))
      )
      .subscribe(publications => this.publisheds = publications);
  }
}
