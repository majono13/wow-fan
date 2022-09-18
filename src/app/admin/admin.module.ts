import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { MaterialModule } from '../shared/material.module';

import { NewPubliComponent } from './new-publi/new-publi.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    NewPubliComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule

  ]
})
export class AdminModule { }
