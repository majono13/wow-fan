import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { PublicationService } from 'src/app/admin/publication.service';
import { Publication } from 'src/app/models/publication.model';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  publication!: Publication[];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router, private publisService: PublicationService) { }

  ngOnInit(): void {
    this.getPublication();
    window.scroll(0, 0)
  }

  getPublication() {
    let urlNews = this.route.snapshot.paramMap.get('url');

    this.publisService.getPublicationByUrl(urlNews)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((publi) => {
        if (publi.length !== 0) this.publication = publi;
        else this.router.navigateByUrl('/not-found');
      });

  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
