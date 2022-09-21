import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPubliComponent } from './admin/new-publi/new-publi.component';
import { BreedsComponent } from './main/breed/breed.component';
import { CharactersComponent } from './main/characters/characters.component';
import { LoreContentComponent } from './main/lore/lore-content/lore-content.component';
import { LoreComponent } from './main/lore/lore.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './main/news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'news/:url', component: NewsComponent },
  { path: 'lore', component: LoreComponent },
  { path: 'lore/:url', component: LoreContentComponent },
  { path: 'breeds', component: BreedsComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'add', component: NewPubliComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
