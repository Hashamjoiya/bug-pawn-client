import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, skip } from 'rxjs';
import { AuthenticatedUser, AuthenticatedUserData, headers, LoginFormData } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<AuthenticatedUserData | null>;
  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject<AuthenticatedUserData | null>(null);
    this.user.pipe(skip(1)).subscribe(data => {
      console.log(data)
      if (data) localStorage.setItem('auth', JSON.stringify(data))
      else {
        localStorage.setItem('auth', '')
        router.navigate(['auth'])
      };
    });

    // auto authenticating
    const data: AuthenticatedUserData = JSON.parse(localStorage.getItem('auth') || '{}')
    if (data?.accessToken) this.user.next(data);
  }

  public get authStateChange() {
    return this.user.asObservable();
  }

  public get isAuthenticated() {
    return this.user.asObservable().pipe(map(data => !!data?.accessToken))
  }

  login(data: LoginFormData) {
    return this.http.post(environment.apiPath + 'users/sign_in', { user: data },
      {
        headers: headers,
        observe: 'response',
      })
      .subscribe(response => {
        if (response) {
          const data = AuthenticatedUser.parseHeaders(response.headers)
          if (data?.accessToken) {
            this.user.next(data)
            this.router.navigate([''])
          }
        }
      });
  }

  public logout() {
    const isAuthenticated = !!this.user.value?.accessToken
    if (!isAuthenticated) return;

    return this.user.next(null);
  }


}
