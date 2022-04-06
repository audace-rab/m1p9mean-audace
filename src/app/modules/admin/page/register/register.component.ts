import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    first_name : null,
    last_name: null,
    email: null,
    birth_date: null,
    profile_id: null,
    login: null,
    password: null,
    city: null
  };

  confirmPass : string = "";

  constructor(private apiService: ApiService) {
    apiService.baseRoute = 'user';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService.post("/register", this.user ).pipe(
          catchError(error => {
            console.log(error.error);
            return error;
          })
        )
        .subscribe(data => console.log(data));
  }
}
