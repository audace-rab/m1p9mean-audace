import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, elementAt } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { PanierService } from 'src/app/service/panier.service';

@Component({
  templateUrl: './plats-commande.component.html',
  styleUrls: ['./plats-commande.component.scss']
})
export class PlatsCommandeComponent implements OnInit {
  restoPlat : any;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private panierService : PanierService) {
    apiService.baseRoute = "restoPlat";
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('idResto');
    this.apiService.get("searchOne?id="+id).pipe(
      catchError(error => {
        return error;
      })
    )
    .subscribe((data: any) =>{
      this.restoPlat = data;
    }
    )
  }

  ajouterPanier(plat: any){
    var sessionCommande = this.panierService.getCart();
    if(Object.entries(sessionCommande).length != 0){
      var nouveauResto = true;
      sessionCommande.forEach((element : any) => {
        if(element.restaurant === this.restoPlat[0].resto._id){
          nouveauResto = false;
          var nouveauPlat = true;
          element.plats.forEach((plt : any) => {
            if(plt._id === plat._id){
              nouveauPlat = false;   
              console.log(plt._id);      
            }
          })
          if(nouveauPlat){
            element.plats.push(plat._id);
          }
        }
      });
      if(nouveauResto){
        console.log('1');
        var cmd = {
          "restaurant" : this.restoPlat[0].resto._id,
          "plats": [plat._id]
        };
        sessionCommande.push(cmd);
        this.panierService.saveCart(sessionCommande);
      }
    }
    else{
      sessionCommande = [];
      console.log('2');
      var cmd = {
        "restaurant" : this.restoPlat[0].resto._id,
        "plats": [plat._id]
      };
      sessionCommande.push(cmd);
      this.panierService.saveCart(sessionCommande);

      
    }
    console.log(sessionCommande);
  }

}
