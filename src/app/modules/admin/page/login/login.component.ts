import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    login: null,
    password: null
  };

  constructor(private apiService: ApiService, private router: Router) {
    apiService.baseRoute = 'user';
  }

  errorMessage = null;

  ngOnInit() {}

  handleSuccess(data: any){
    this.apiService.createSession(data);
  }

  onSubmit() {
    this.apiService.post("/login", this.user ).pipe(
          catchError(error => {
            console.log(error.error);
            this.errorMessage = error.error.message;
            return error;
          })
        )
        .subscribe((data: any) =>{
          this.handleSuccess(data);
          console.log("data",data);
          if(data.profile_id.profile_name !== 'client') this.router.navigate(["admin/home/dashboard"]);
          else this.router.navigate(["front"]);
        });
  }
}
