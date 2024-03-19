import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iRegister } from '../Models/i-register';
import { iAccessData } from '../Models/i-access-data';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { iLogin } from '../Models/i-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<iAccessData|null>(null);
  user$ = this.authSubject.asObservable(); // Questo contiene i dati dell'utente loggato oppure null
  isLoggedIn$ = this.user$.pipe(map(user => !! user)); // Riceverò un booleano che mi restituisce se l'utente è loggsato o no

  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    this.restoreUser();
  }

  apiUrl: string = environment.apiUrl
  registerUrl: string = environment.apiUrl + '/auth/register';
  loginUrl: string = environment.apiUrl + '/auth/login';



  signUp(data:iRegister):Observable<iAccessData>{
    return this.http.post<iAccessData>(this.registerUrl, data)
  }

  logIn(data:iLogin):Observable<iAccessData>{
    return this.http.post<iAccessData>(this.loginUrl, data)
    .pipe(tap(data => {
      this.authSubject.next(data)
      localStorage.setItem('accessData', JSON.stringify(data))

      this.autoLogout(data.message)

    }))
  }

  autoLogout(jwt:string){
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date
    const expMS = expDate.getTime() - new Date().getTime()

    setTimeout(() => {
      this.logout()}, expMS)
  }

  logout(){
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/home']);
  }

  restoreUser(){
    const userJson:string|null = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData:iAccessData = JSON.parse(userJson);
    if(this.jwtHelper.isTokenExpired(accessData.message)){
      this.logout();
      return;
    }

    this.autoLogout(accessData.message)
    this.authSubject.next(accessData)
  }
}
