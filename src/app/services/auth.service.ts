import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = '/users/authenticate';
  constructor(private http: HttpClient) { }

  public login(username, password): Observable<HttpResponse<User>> {
    const body = {username, password};
    return this.http.post<User>(this.url, body, {observe : 'response'});
  }

  public setToken(user: User) {
    window.localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);
    window.localStorage.setItem('AuthToken', user.token);
  }

  public isLoggedIn() {
    return window.localStorage.getItem('AuthToken');
  }

  public getUsername() {
    return window.localStorage.getItem('userName');
  }

  public logOut() {
    delete window.localStorage.userName;
    delete window.localStorage.AuthToken;
  }

}
