import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  apiUrl: string = environment.apiUrl
  registerUrl: string = environment.apiUrl + '/register';
  loginUrl: string = environment.apiUrl + '/login';



  signUp(){
    // return this.http.post(this.registerUrl, )
  }
}
