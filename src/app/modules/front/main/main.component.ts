import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  restos : any = [];
  restoTemp : any = [];
  searchText = "";

  constructor(private apiService: ApiService, private router : Router) {
    apiService.baseRoute = 'restaurant';   
  }

  ngOnInit() {
    this.apiService.get("").pipe(
      catchError(error => {
        console.log(error.error);
    
        return error;
      })
    )
    .subscribe((data: any) =>{
      this.restos = data;
    });
  }

  addItem(item: string){
    this.searchText = item;
    if(this.searchText !== ""){
      this.restoTemp = this.restos;
      const temp : any = [];
      this.restos.filter((resto: any) => {
        if(resto.nom.toLowerCase().includes(this.searchText.toLowerCase())){
          temp.push(resto);
        }
        this.restos = temp;
      })
    }else if(this.restoTemp.length > 0 && this.searchText === ""){
      this.restos = this.restoTemp;
    }
  }

  commander(id: any){
    this.router.navigate(["front/commande",{idResto:id}]);
  }

}
