
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, from, switchMap, take, throwError } from 'rxjs';
import { iAccessData } from '../Models/i-access-data';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authSvc:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('/utenti/')) {
      return this.authSvc.user$.pipe(
        take(1),
        switchMap((user: iAccessData | null) => {
        if (!user || !user.message) return next.handle(request);

        const newRequest = request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + user.message)
        });

        return next.handle(newRequest);
      }));
    }
    return next.handle(request);
  }
}
