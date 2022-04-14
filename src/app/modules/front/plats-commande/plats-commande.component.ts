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
      var restoExist = false;
      for(var i=0 ; i<sessionCommande.length; i++){
        if(sessionCommande[i].restaurant._id === this.restoPlat[0].resto._id){
          restoExist = true;
          var platExist = false;
          for(var j=0; j<sessionCommande[i].plats.length; j++){
            if(sessionCommande[i].plats[j].objetPlat._id === plat._id){
              platExist = true;
              break;
            }
          }
          if(!platExist){
            var plt = {"objetPlat": plat, "quantite": 1};
            sessionCommande[i].plats.push(plt);
          }
        }
      }
      if(!restoExist){
        var plt = {"objetPlat": plat, "quantite": 1};
        var cmd = {
          "plats" : [plt],
          "restaurant" : this.restoPlat[0].resto
        }
        console.log(cmd);
        sessionCommande.push(cmd);
      }
    }
    else{
      sessionCommande = [];
      var plt = {"objetPlat": plat, "quantite": 1};
        var cmd = {
          "plats" : [plt],
          "restaurant" : this.restoPlat[0].resto
        }
        console.log(cmd); 
        sessionCommande.push(cmd);
    }

    this.panierService.saveCart(sessionCommande);
  }

}
