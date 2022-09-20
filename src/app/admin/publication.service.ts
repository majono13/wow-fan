import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from '@firebase/util';
import { Publication } from '../models/publication.model';

import { map } from 'rxjs';

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


  getPublications() {
    return this.publisCollection.valueChanges()
      .pipe(
        map((results) => results.filter((publi) => publi.published === true))
      )
  }

  getPublicationsByCategory(category: string) {
    return this.publisCollection.valueChanges()
      .pipe(
        map((results) => results.filter((publi) => publi.category === category)),
      )
  }

  newPlublication(publi: Publication) {
    publi.id = this.afs.createId();
    return this.publisCollection.doc(publi.id).set(publi);
  }
}
