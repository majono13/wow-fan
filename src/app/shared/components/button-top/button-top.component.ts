import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-top',
  templateUrl: './button-top.component.html',
  styleUrls: ['./button-top.component.scss']
})
export class ButtonTopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  backToTop() {
    window.scrollTo(0, 0);
  }

}
