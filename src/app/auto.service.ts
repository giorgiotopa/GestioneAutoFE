import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { iAuto } from './pages/Models/i-auto';
import { iApiResponse } from './pages/Models/i-api-response';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  apiUrl: string = environment.apiUrl + '/auto';

  constructor(
    private http: HttpClient
  ) { }

  getAll():Observable<iApiResponse<iAuto>>{
    return this.http.get<iApiResponse<iAuto>>(this.apiUrl);
  }

  // getAllMarca():Observable<string[]>{
  //   return this.http.get<iAuto[]>(this.apiUrl)
  //   .pipe(map(autoArr => autoArr.map(a => a.marca)));
  // }

  getById(id:string):Observable<iApiResponse<iAuto>>{
    return this.http.get<iApiResponse<iAuto>>(this.apiUrl + `/${id}`);
  }

  create(auto:Partial<iAuto>):Observable<iAuto>{
    return this.http.post<iAuto>(this.apiUrl,auto)
  }

  update(pizza:iAuto){
    return this.http.put<iAuto>(this.apiUrl + `/${pizza.id}`,pizza);
  }

  delete(id:string){
    return this.http.delete<iAuto>(this.apiUrl + `/${id}`);
  }

}
