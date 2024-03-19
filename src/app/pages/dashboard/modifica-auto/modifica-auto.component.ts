import { AutoService } from './../../../auto.service';
import { Component } from '@angular/core';
import { iAuto } from '../../Models/i-auto';
import { ActivatedRoute } from '@angular/router';
import { iApiResponseObj } from '../../Models/i-api-response-obj';
import { iRegisterAuto } from '../../Models/i-register-auto';

@Component({
  selector: 'app-modifica-auto',
  templateUrl: './modifica-auto.component.html',
  styleUrl: './modifica-auto.component.scss'
})
export class ModificaAutoComponent {

  auto!: iAuto;
  isModifica: boolean = false;
  autoUpdate: Partial<iRegisterAuto>= {
    marca: '',
    modello: '',
    annoDiImmatricolazione: 0,
    cilindrata: 0,
    tipoAlimentazione: '',
    descrizione: '',
    prezzo: 0,
    utenteId: ''
  };

  constructor(
    private autoService: AutoService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.getAutoDetails();
  }

  getAutoDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.autoService.getById(id).subscribe(
        (response: iApiResponseObj<iAuto>) => {
          this.auto = response.response;
          console.log(response);
          this.autoRegister(this.auto);

        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  autoRegister(auto:iAuto): void{
    this.autoUpdate.id = this.auto.id;
    this.autoUpdate.marca = this.auto.marca;
    this.autoUpdate.modello = this.auto.modello;
    this.autoUpdate.annoDiImmatricolazione = this.auto.annoDiImmatricolazione;
    this.autoUpdate.cilindrata = this.auto.cilindrata;
    this.autoUpdate.tipoAlimentazione = this.auto.tipoAlimentazione;
    this.autoUpdate.descrizione = this.auto.descrizione;
    this.autoUpdate.prezzo = this.auto.prezzo;
    this.autoUpdate.utenteId = this.auto.utente.id;
  }

  attivaModifica(){
    this.isModifica = true;
  }

  updateAuto() {
    this.autoService.update(this.autoUpdate).subscribe(
      response => {
        console.log('Auto aggiornata con successo:', response);
        this.isModifica = false;
      },
      error => {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
      }
    );
  }

}
