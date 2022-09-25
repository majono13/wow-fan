import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { MaterialModule } from '../shared/material.module';

import { MenuComponent } from '../shared/components/menu/menu.component';
import { MainComponent } from './main.component';
import { NewsComponent } from './news/news.component';
import { LoreComponent } from './lore/lore.component';
import { LoreContentComponent } from './lore/lore-content/lore-content.component';
import { BreedsComponent } from './breed/breed.component';
import { CharactersComponent } from './characters/characters.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ButtonTopComponent } from '../shared/components/button-top/button-top.component';



@NgModule({
  declarations: [
    MenuComponent,
    MainComponent,
    NewsComponent,
    LoreComponent,
    LoreContentComponent,
    BreedsComponent,
    CharactersComponent,
    MainHomeComponent,
    FooterComponent,
    ButtonTopComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
