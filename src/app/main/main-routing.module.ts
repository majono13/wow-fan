import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { BreedsComponent } from './breed/breed.component';
import { CharactersComponent } from './characters/characters.component';
import { LoreContentComponent } from './lore/lore-content/lore-content.component';
import { LoreComponent } from './lore/lore.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainComponent } from './main.component';
import { NewsComponent } from './news/news.component';

const mainRoutes: Routes = [

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
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
