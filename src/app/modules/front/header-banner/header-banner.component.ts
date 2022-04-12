import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.css']
})
export class HeaderBannerComponent implements OnInit {
  constructor() { }
  ngAfterViewInit(): void {

  }

  ngOnInit() {
  }

  scrollView(){
    window.scrollTo(0, 850);
  }
}
