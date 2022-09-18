import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { PublicationService } from '../admin/publication.service';
import { Publication } from '../models/publication.model';
import { SanackbarService } from '../shared/services/snackbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private publisService: PublicationService, private sanackBar: SanackbarService) { }

  publications: Publication[] = [];
  $unsubscribe: Subject<any> = new Subject();
  featured: Publication;

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    this.publisService.getPublications()
      .pipe(
        takeUntil(this.$unsubscribe),
        tap((publi) => this.featured = publi[0])
      )
      .subscribe((publi) => this.publications = publi);

  }

  ngOnDestroy() {
    this.$unsubscribe.complete();
  }

}
