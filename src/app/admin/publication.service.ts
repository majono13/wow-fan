import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from '@firebase/util';
import { Publication } from '../models/publication.model';

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
    return this.publisCollection.valueChanges();
  }

  newPlublication(publi: Publication) {
    publi.id = this.afs.createId();
    return this.publisCollection.doc(publi.id).set(publi);
  }
}
