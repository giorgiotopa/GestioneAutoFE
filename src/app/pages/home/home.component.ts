import { Observable, tap } from 'rxjs';
import { AutoService } from '../../auto.service';
import { iApiResponse } from '../Models/i-api-response';
import { iAuto } from '../Models/i-auto';
import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  autoList: iAuto[] = [];

  constructor(private autoService: AutoService){}


  ngOnInit(){
    this.loadAuto()
  }

  loadAuto(){
    this.autoService.getAll().subscribe(
      (response: iApiResponse<iAuto>[]) =>{
        console.log(response);

      }
    )
  }

}
