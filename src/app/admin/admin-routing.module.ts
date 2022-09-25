import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { DetailsComponent } from './admin/details/details.component';
import { EditComponent } from './admin/edit/edit.component';
import { HomeComponent } from './admin/home/home.component';
import { NewPubliComponent } from './admin/new-publi/new-publi.component';
import { RegisterComponent } from './auth/register/register.component';

const adminRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:url', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'add', component: NewPubliComponent },
  { path: 'new-admin', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
