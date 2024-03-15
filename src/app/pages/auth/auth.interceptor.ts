
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { iAccessData } from '../Models/i-access-data';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authSvc:AuthService
  ) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   return this.authSvc.user$.pipe(switchMap((user:iAccessData|null) => {

  //     if(!user) return next.handle(request);

  //     const newRequest = request.clone({
  //       headers: request.headers.append('Authorization','Bearer '+ user.message)
  //     })

  //     return next.handle(newRequest);
  //   }))

  // }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Controlla se l'URL della richiesta inizia con '/utenti/'
    if (request.url.includes('/utenti/')) {
      return this.authSvc.user$.pipe(switchMap((user: iAccessData | null) => {
        if (!user) return next.handle(request);

        const newRequest = request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + user.message)
        });

        return next.handle(newRequest);
      }));
    }
    return next.handle(request);
  }
}
