import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, from, switchMap, of, map } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userCollection: AngularFirestoreCollection<User> = this.afs.collection('user');


  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,) { }

  registerNewUser(user: User): Observable<boolean> {
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.acessCode))
      .pipe(
        switchMap((u: any) =>
          this.userCollection.doc(u.user.uid).set({
            name: user.name,
            email: user.email,
            id: u.user.uid
          })
            .then(() => true)
        )
      );
  }

  login(credenciais: { email: string, acessCode: string }): Observable<User> {

    return from(this.afAuth.signInWithEmailAndPassword(credenciais.email, credenciais.acessCode))
      .pipe(
        switchMap((user) => this.userCollection.doc<User>(user.user.uid).valueChanges()),
      );
  }

  getUser(): Observable<User> {
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ? this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
      );
  }

  isauthenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map((res) => (res) ? true : false)
      );
  }


  logout() {
    this.afAuth.signOut();
  }

}
