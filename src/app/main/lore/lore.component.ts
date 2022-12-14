import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, map } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-lore',
  templateUrl: './lore.component.html',
  styleUrls: ['./lore.component.scss']
})
export class LoreComponent implements OnInit {

  constructor(private publisService: PublicationService) { }

  publications: Publication[] = []
  unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    this.publisService.getPublicationsByCategory('Lore')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((publications) => this.publications = publications);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
