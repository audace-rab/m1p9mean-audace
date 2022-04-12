import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-inscription',
  templateUrl: './login-inscription.component.html',
  styleUrls: ['./login-inscription.component.css']
})
export class LoginInscriptionComponent implements OnInit {
  @ViewChild('login')
  login!: ElementRef<any>;
  @ViewChild('inscription')
  inscription!: ElementRef<any>;
  @ViewChild('connectlogin')
  connectLogin!: ElementRef<any>;
  @ViewChild('createacount')
  createAcount!: ElementRef<any>;



  constructor() { }
  ngAfterViewInit(): void {
    this.inscription.nativeElement.style.display = "none";
    this.connectLogin.nativeElement.addEventListener('click', () => {
      this.inscription.nativeElement.style.display = "none";
      this.login.nativeElement.style.display = "block";
      this.login.nativeElement.style.animation= "fadeInAnimation ease 3s";
    })

    this.createAcount.nativeElement.addEventListener('click', () => {
      this.inscription.nativeElement.style.display = "block";
      this.login.nativeElement.style.display = "none";
      this.inscription.nativeElement.style.animation= "fadeInAnimation ease 3s";
    })
  }

  ngOnInit() {
  }

}
