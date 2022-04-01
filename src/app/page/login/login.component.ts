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

  ngOnInit() {}

  onSubmit() {
    // this.apiService
    //   .get("")
    //   .pipe(
    //     catchError(error => {
    //       console.log(error);
    //       return error;
    //     })
    //   )
    //   .subscribe(data => console.log(data));
    this.apiService.post("/login", this.user ).pipe(
          catchError(error => {
            console.log(error.error);
            return error;
          })
        )
        .subscribe(data => console.log(data));
  }
}
