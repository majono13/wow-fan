import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  publications: Publication[] = [];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublications()
  }

  getPublications() {
    this.publisService.getPublicationsByCategory('Personagens')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(publis => this.publications = publis);
  }

}
