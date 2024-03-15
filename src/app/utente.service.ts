import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iApiResponseObj } from './pages/Models/i-api-response-obj';
import { iUser } from './pages/Models/i-user';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  apiUrl: string = environment.apiUrl + '/utenti'

  constructor(
    private http: HttpClient
  ) { }


  getById(id:string): Observable<iApiResponseObj<iUser>>{
    return this.http.get<iApiResponseObj<iUser>>(this.apiUrl + `/${id}`);
  }

  update(user: iUser){
    return this.http.put<iUser>(this.apiUrl + `/${user.id}`, user);
  }

  delete(id:string){
    return this.http.delete<iUser>(this.apiUrl + `/${id}`);
  }

  uploadAvatar(id: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('upload', file, file.name);
    return this.http.patch<any>(`${this.apiUrl}/${id}/upload`, formData);
  }

}
