import { AutoService } from './../../auto.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iAuto } from '../Models/i-auto';
import { iApiResponseArr } from '../Models/i-api-response-arr';
import { iApiResponseObj } from '../Models/i-api-response-obj';
import { iUser } from '../Models/i-user';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.component.html',
  styleUrl: './dettagli.component.scss'
})
export class DettagliComponent {

  auto!: iAuto;
  user!: iUser;

  constructor(
    private route: ActivatedRoute,
    private autoService: AutoService
    ){}

    ngOnInit(): void {
      this.getAutoDetails();
    }

    getAutoDetails(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.autoService.getById(id).subscribe(
          (response: iApiResponseObj<iAuto>) => {
            console.log(response);
            this.auto = response.response;
            this.user = response.response.utente;

          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
}
