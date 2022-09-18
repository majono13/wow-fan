import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    const menu = document.querySelector('.menu') as HTMLDivElement;
    const matToolbar = document.querySelector('.mat-toolbar') as HTMLDivElement;

    if (menu?.className === 'menu') {
      menu.className += ' menu-mobile';
      matToolbar.className += ' animate__animated animate__fadeInDown';

    } else {
      menu.className = 'menu';
      matToolbar.className += 'mat-toolbar';
    }
  }

}
