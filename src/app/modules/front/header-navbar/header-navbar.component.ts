import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'flowbite';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ClientTokenStorageService } from 'src/app/service/client/client.token.service';
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
  @ViewChild('ajouterBtn')
  ajouterBtn!: ElementRef<any>;
  @ViewChild('enleverBtn')
  enleverBtn!: ElementRef<any>;

  output = '';
  panierCommande: any = [];
  errorMessage = "";

  constructor(
    private panierService: PanierService,
    private elementRef: ElementRef,
    private clientTokenService : ClientTokenStorageService,
    private apiService: ApiService,
  ) {
    apiService.baseRoute = "commande";
  }

  ngAfterViewInit(): void {
    this.user.nativeElement.addEventListener('click', () => {
      if (this.profil.nativeElement.style.display === 'block') {
        this.profil.nativeElement.style.display = 'none';
      } else {
        this.profil.nativeElement.style.display = 'block';
      }
    });

    this.close.nativeElement.addEventListener('click', () => {
      this.close.nativeElement.style.display = 'none';
      this.open.nativeElement.style.display = 'block';
      this.mobileMenu.nativeElement.style.display = 'block';
    });
    this.open.nativeElement.addEventListener('click', () => {
      this.close.nativeElement.style.display = 'block';
      this.open.nativeElement.style.display = 'none';
      this.mobileMenu.nativeElement.style.display = 'none';
    });
  }

  ajouter(plat: any) {
    plat.quantite += 1;
    this.panierService.saveCart(this.panierCommande);
  }

  enlever(plat: any) {
    if (plat.quantite > 1) {
      plat.quantite -= 1;
    }

    this.panierService.saveCart(this.panierCommande);
  }

  onChange(plat: any) {
    this.panierService.saveCart(this.panierCommande);
  }

  remove(cmd: any, plat: any) {
    this.panierCommande[this.panierCommande.indexOf(cmd)].plats.splice(
      this.panierCommande[this.panierCommande.indexOf(cmd)].plats.indexOf(plat),
      1
    );
    if (
      this.panierCommande[this.panierCommande.indexOf(cmd)].plats.length == 0
    ) {
      this.panierCommande.splice(this.panierCommande.indexOf(cmd), 1);
    }
    this.panierService.saveCart(this.panierCommande);
  }

  sommer(cmd: any) {
    return cmd.plats.reduce(
      (a: any, b: any) => a + b.objetPlat.prix * b.quantite,
      0
    );
  }

  verifierUser(){
    this.panierCommande.forEach((element: any) => {
      if(!element?.client){
        this.errorMessage = "Vous devez d'abord se connecter!";
        return false;
      }
      return true;
    });
    return true;
  }

  valider(){
    if(this.verifierUser()){
      this.panierCommande.forEach((cmd: any) => {
        cmd.plats.forEach((plat: any) => {
          if(plat.quantite === 0){
            cmd.plats.splice(cmd.plats.indexOf(plat), 1);
          }
        });
        cmd["client"] = this.clientTokenService.getUser()._id;
        this.apiService.post("/commander", this.panierCommande ).pipe(
          catchError(error => {
            return error;
          })
        )
        .subscribe((data: any) =>{
    
        });
      });  
    }

  }

  ngOnInit() {
    var panier = this.panierService.getCart();
    if (Object.entries(panier).length != 0) {
      this.panierCommande = panier;
    }
  }
}
