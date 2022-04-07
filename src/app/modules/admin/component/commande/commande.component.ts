import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  commandes : any;

  constructor(private apiService: ApiService) { 
    apiService.baseRoute = 'commande';    
  }

  ngOnInit(): void {
    this.apiService.get("").pipe(
      catchError(error => {
        return error;
      })
    )
    .subscribe((data: any) =>{
      this.commandes = data;
    }
    )
  }

}
