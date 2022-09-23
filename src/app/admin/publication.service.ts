import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication.model';

import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  categories: string[] = [
    'Noticias',
    'Classes',
    'Raças',
    'Lore',
    'Personagens'
  ];

  private readonly publisCollection: AngularFirestoreCollection<Publication> = this.afs.collection('publications');

  constructor(private afs: AngularFirestore) { }

  //Filtra publicações com status de publicado por categoria
  getPublicationsByCategory(category: string): Observable<Publication[]> {
    return this.afs.collection<Publication>('publications', ref => ref.orderBy('order').startAfter(0))
      .valueChanges()
      .pipe(
        map((results) => results.filter((publi) => publi.published === true)),
        map((results) => results.filter((publi) => publi.category === category)),
      )
  }

  //Filtra todas as publicações
  getAllPublications(): Observable<Publication[]> {
    return this.afs.collection<Publication>('publications', ref => ref.orderBy('order').startAfter(0))
      .valueChanges();
  }

  //Filtra todas as publicações por id
  getPublicationById(id: string) {
    return this.afs.collection<Publication>('publications', ref => ref.orderBy('id').startAt(id).endAt(id))
      .valueChanges();
  }

  //Filtra as publicações publicadas por url
  getPublicationByUrl(url: string) {

    return this.afs.collection<Publication>('publications', ref => ref.orderBy('url').startAt(url).endAt(url))
      .valueChanges()
      .pipe(
        map((results) => results.filter((publi) => publi.published === true))
      )
  }

  newPlublication(publi: Publication) {
    publi.id = this.afs.createId();
    return this.publisCollection.doc(publi.id).set(publi);
  }

  async editPublication(publi: Publication) {
    return this.publisCollection.doc(publi.id).set(publi);
  }

  createUrl(title: string): string {
    const textUrl = title;

    let url = textUrl.replace(/ /g, '-');

    return url.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
}
