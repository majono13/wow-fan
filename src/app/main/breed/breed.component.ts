import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';
import { BreedContentComponent } from './breed-content/breed-content.component';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedsComponent implements OnInit {

  publications: Publication[] = [];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublications();
    console.log('oi')
  }

  getPublications() {
    this.publisService.getPublicationsByCategory('Raças')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((publications) => this.publications = publications);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
