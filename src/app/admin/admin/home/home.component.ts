import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from '../../publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  publications!: Publication[];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    this.publisService.getAllPublications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(publications => this.publications = publications);
  }

}
