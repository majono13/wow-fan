import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, Subject, takeUntil, filter } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-lore-content',
  templateUrl: './lore-content.component.html',
  styleUrls: ['./lore-content.component.scss']
})
export class LoreContentComponent implements OnInit {

  publication!: Publication;
  unsubiscribe$: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublication();
  }

  getPublication() {


    this.publisService.getPublications()
      .pipe(takeUntil(this.unsubiscribe$))
      .subscribe((publi) => this.getPublicationLore(publi));
  }

  getPublicationLore(publi: Publication[]) {
    let urlLore = this.route.snapshot.paramMap.get('url');

    for (let p of publi) {

      if (p.url === urlLore) {
        this.publication = p;
        return;
      }
    }
  }

  ngOnDestroy() {
    this.unsubiscribe$.complete();
  }
}
