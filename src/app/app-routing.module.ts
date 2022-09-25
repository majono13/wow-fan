import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
  ;
import { AdminComponent } from './admin/admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginComponent } from './admin/auth/login/login.component';
import { AuthGuard } from './admin/auth/services/auth-guard.service';

const routes: Routes = [

  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
