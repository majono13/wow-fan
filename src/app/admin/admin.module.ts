import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { MaterialModule } from '../shared/material.module';

import { NewPubliComponent } from './admin/new-publi/new-publi.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import { DetailsComponent } from './admin/details/details.component';
import { EditComponent } from './admin/edit/edit.component';
import { DialogComponent } from './admin/dialog/dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MatPaginatorIntl } from '@angular/material/paginator';


const rangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} de ${length}`;
}

export function getIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Quantidade por página:';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primeira página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = rangeLabel;
  return paginatorIntl;
}


@NgModule({
  declarations: [
    NewPubliComponent,
    AdminComponent,
    HomeComponent,
    MenuAdminComponent,
    DetailsComponent,
    EditComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getIntl() }
  ]
})



export class AdminModule { }
