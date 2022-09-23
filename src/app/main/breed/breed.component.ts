import { Component, OnInit } from '@angular/core';

import { map, Subject, takeUntil, filter } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedsComponent implements OnInit {

  hiddenDetails: boolean = true;
  publicationsHorda: Publication[] = [];
  publicationsAliance: Publication[] = [];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublicationByFac('Horda');
    this.getPublicationByFac('Aliance')
  }

  getPublicationByFac(fac: string) {
    return this.publisService.getPublicationsByCategory('Raças')
      .pipe(
        map((results) => results.filter((publi) => publi.fac === fac))
      ).subscribe(res => {
        if (fac == 'Horda') this.publicationsHorda = res;
        else if (fac == 'Aliance') this.publicationsAliance = res;
      }
      );
  }

  showDetails() {
    this.hiddenDetails = false;
  }

  closeDetails() {
    this.hiddenDetails = true;
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
