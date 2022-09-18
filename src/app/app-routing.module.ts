import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPubliComponent } from './admin/new-publi/new-publi.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './main/news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'news/:url', component: NewsComponent },
  { path: 'add', component: NewPubliComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
