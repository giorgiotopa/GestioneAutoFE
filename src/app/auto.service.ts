import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { iAuto } from './pages/Models/i-auto';
import { iApiResponseArr } from './pages/Models/i-api-response-arr';
import { iApiResponseObj } from './pages/Models/i-api-response-obj';
import { iRegisterAuto } from './pages/Models/i-register-auto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  apiUrl: string = environment.apiUrl + '/auto';

  constructor(
    private http: HttpClient
  ) { }

  getAll():Observable<iApiResponseArr<iAuto>>{
    return this.http.get<iApiResponseArr<iAuto>>(this.apiUrl);
  }

  // getAllMarca():Observable<string[]>{
  //   return this.http.get<iAuto[]>(this.apiUrl)
  //   .pipe(map(autoArr => autoArr.map(a => a.marca)));
  // }

  getById(id:string):Observable<iApiResponseObj<iAuto>>{
    return this.http.get<iApiResponseObj<iAuto>>(this.apiUrl + `/${id}`);
  }

  create(auto:Partial<iRegisterAuto>):Observable<iAuto>{
    return this.http.post<iAuto>(this.apiUrl + `/create`,auto)
  }

  update(auto:iAuto){
    return this.http.put<iAuto>(this.apiUrl + `/${auto.id}`,auto);
  }

  uploadFoto(id: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('upload', file, file.name);
    return this.http.patch<any>(`${this.apiUrl}/${id}/upload`, formData);
  }

  delete(id:string){
    return this.http.delete<iAuto>(this.apiUrl + `/${id}`);
  }

}
