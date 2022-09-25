import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map, Subject, takeUntil, filter } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-lore-content',
  templateUrl: './lore-content.component.html',
  styleUrls: ['./lore-content.component.scss']
})
export class LoreContentComponent implements OnInit {

  publication!: Publication[];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router, private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublication();
  }

  getPublication() {

    let urlLore = this.route.snapshot.paramMap.get('url');

    this.publisService.getPublicationByUrl(urlLore)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (publi) => {
          if (publi.length !== 0) this.publication = publi;
          else this.router.navigateByUrl('/not-found');
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
}
