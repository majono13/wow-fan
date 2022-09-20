import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import 'animate.css';

import { AdminModule } from './admin/admin.module';
import { MenuComponent } from './shared/components/menu/menu.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewsComponent } from './main/news/news.component';
import { LoreComponent } from './main/lore/lore.component';
import { LoreContentComponent } from './main/lore/lore-content/lore-content.component';
import { BreedsComponent } from './main/breed/breed.component';
import { BreedContentComponent } from './main/breed/breed-content/breed-content.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    PageNotFoundComponent,
    NewsComponent,
    LoreComponent,
    LoreContentComponent,
    BreedsComponent,
    BreedContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
  ],
  providers: [PageNotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
