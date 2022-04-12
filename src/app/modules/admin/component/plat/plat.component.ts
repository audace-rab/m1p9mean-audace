import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { TokenStorageService } from 'src/app/service/token.service';

@Component({
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {
  restoPlats : any = [];

  constructor(private apiService: ApiService, private tokenService : TokenStorageService) { 
    apiService.baseRoute = 'restoPlat';    
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
        data.filter((rst : any) => {
          if(rst.resto.nom === user.resto.nom)
          this.restoPlats.push(rst);
        })
      }
      else this.restoPlats = data;
    }
    )
  }

}
