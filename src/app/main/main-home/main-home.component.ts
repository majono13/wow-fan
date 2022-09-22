import { Component, OnInit } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { PublicationService } from '../../admin/publication.service';
import { Publication } from '../../models/publication.model';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit {

  constructor(private publisService: PublicationService) { }

  publications: Publication[] = [];
  $unsubscribe: Subject<any> = new Subject();
  featured: Publication;

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    console.log(this.publisService.op2())
    this.publisService.getPublicationsByCategory('Noticias')
      .pipe(
        takeUntil(this.$unsubscribe),
        tap((results) => this.getFeatured(results)),
      )
      .subscribe((publi) => this.publications = publi);


  }

  getFeatured(publications: Publication[]) {
    for (let i in publications) {
      if (publications[i].featured === true) {
        this.featured = publications[i];
        return;
      }
    }
  }

  ngOnDestroy() {
    this.$unsubscribe.complete();
  }

}
