import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iRegister } from '../Models/i-register';
import { iAccessData } from '../Models/i-access-data';
import { Observable } from 'rxjs';
import { iLogin } from '../Models/i-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  apiUrl: string = environment.apiUrl
  registerUrl: string = environment.apiUrl + '/auth/register';
  loginUrl: string = environment.apiUrl + '/login';



  signUp(data:iRegister):Observable<iAccessData>{
    return this.http.post<iAccessData>(this.registerUrl, data)
  }

  logIng(data:iLogin):Observable<iAccessData>{
    return this.http.post<iAccessData>(this.loginUrl, data)
  }
}
