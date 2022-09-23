import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
  ;
import { AdminComponent } from './admin/admin/admin.component';
import { EditComponent } from './admin/admin/edit/edit.component';
import { DetailsComponent } from './admin/admin/details/details.component';
import { HomeComponent } from './admin/admin/home/home.component';
import { NewPubliComponent } from './admin/admin/new-publi/new-publi.component';
import { BreedsComponent } from './main/breed/breed.component';
import { CharactersComponent } from './main/characters/characters.component';
import { LoreContentComponent } from './main/lore/lore-content/lore-content.component';
import { LoreComponent } from './main/lore/lore.component';
import { MainHomeComponent } from './main/main-home/main-home.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './main/news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './admin/auth/register/register.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { AuthGuard } from './admin/auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: MainHomeComponent },
      { path: 'news/:url', component: NewsComponent },
      { path: 'lore', component: LoreComponent },
      { path: 'lore/:url', component: LoreContentComponent },
      { path: 'breeds', component: BreedsComponent },
      { path: 'characters', component: CharactersComponent }
    ]
  },

  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'details/:url', component: DetailsComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'add', component: NewPubliComponent },
      { path: 'new-admin', component: RegisterComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
