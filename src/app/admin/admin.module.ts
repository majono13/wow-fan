import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { MaterialModule } from '../shared/material.module';

import { NewPubliComponent } from './new-publi/new-publi.component';
import { environment } from 'src/environments/environment';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import { DetailsComponent } from './admin/home/details/details.component';
import { EditComponent } from './admin/edit/edit.component';


@NgModule({
  declarations: [
    NewPubliComponent,
    AdminComponent,
    HomeComponent,
    MenuAdminComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class AdminModule { }
