import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'flowbite';
import { PanierService } from 'src/app/service/panier.service';


@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {
  @ViewChild('user')
  user!: ElementRef<any>;
  @ViewChild('profil')
  profil!: ElementRef<any>;
  @ViewChild('close')
  close!: ElementRef<any>;
  @ViewChild('cpen')
  open!: ElementRef<any>;
  @ViewChild('mobileMenu')
  mobileMenu!: ElementRef<any>;

  constructor(private panierService : PanierService) {

  }
  
  ngAfterViewInit(): void {

    this.user.nativeElement.addEventListener('click', () => {
      if (this.profil.nativeElement.style.display === "block") {
        this.profil.nativeElement.style.display = "none";
      } else {
        this.profil.nativeElement.style.display = "block";
      }
    })

    this.close.nativeElement.addEventListener('click', () => {
      this.close.nativeElement.style.display = "none";
      this.open.nativeElement.style.display = "block";
      this.mobileMenu.nativeElement.style.display = "block";
    });
    this.open.nativeElement.addEventListener('click', () => {
      this.close.nativeElement.style.display = "block";
      this.open.nativeElement.style.display = "none";
      this.mobileMenu.nativeElement.style.display = "none";
    });
  }

  ngOnInit() {
  }

}
