import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, UserRegister } from '../../model/user.model';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl ='https://user-api-app-g2bmh6ddd6dgg5e0.swedencentral-01.azurewebsites.net/api/auth';

  constructor(private http: HttpClient) { }

  registerUser (payload: UserRegister) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  loginUser(payload: LoginModel) : Observable <{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, payload);
    
  }
  }
