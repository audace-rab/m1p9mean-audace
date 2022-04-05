import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user = {
    login: null,
    password: null
  };

  constructor(private apiService: ApiService) {
    apiService.baseRoute = 'user';
  }

  errorMessage = null;

  ngOnInit() {}

  handleSuccess(data: any){
    this.apiService.createSession(data);
  }

  onCheck(){   
    this.apiService.get("/listAll").pipe(
      catchError(err => {
        console.log(err.error);
        return err;
      })
    ).subscribe(res => {
      console.log(res);
    })
  }

  onSubmit() {
    this.apiService.post("/login", this.user ).pipe(
          catchError(error => {
            console.log(error.error);
            this.errorMessage = error.error.message;
            return error;
          })
        )
        .subscribe(data =>{
          this.handleSuccess(data);
        });
  }
}
