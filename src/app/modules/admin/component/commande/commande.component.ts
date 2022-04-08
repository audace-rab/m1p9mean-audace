import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { TokenStorageService } from 'src/app/service/token.service';

@Component({
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})


export class CommandeComponent implements OnInit {
  @ViewChild('exampleModalCenter') myDiv!: ElementRef;

  commandes : any = [];
  cmdFille : any;

  constructor(private apiService: ApiService, private tokenService : TokenStorageService) { 
    apiService.baseRoute = 'commande';    
  }

  ngOnInit(): void {
    this.apiService.get("").pipe(
      catchError(error => {
        return error;
      })
    )
    .subscribe((data: any) =>{
      const user = this.tokenService.getUser();
      if(data && user.resto && user.resto._id !== ""){
        data.filter((commande : any) => {
          if(commande.restaurant.nom === user.resto.nom)
          this.commandes.push(commande);
        })
      }
      else this.commandes = data;
    }
    )
  }

  showModal(commande : any){
    this.myDiv.nativeElement.style.display = "block";
    this.commandes.filter((cmd: any) => {
      if(cmd == commande)
      this.cmdFille = cmd;
    });
  }

  hideModal(){
    this.myDiv.nativeElement.style.display = "none"
  }


}
