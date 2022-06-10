import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginFormData } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(data: LoginFormData) {
    return this.http.post(environment.apiPath + 'users/sign_in', data,{
      headers:{
        'content-type': 'application/json'
      }
    })
      .subscribe(response => {
        console.log(response)
      });
  }
}
