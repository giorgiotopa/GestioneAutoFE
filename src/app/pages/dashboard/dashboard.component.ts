import { iAccessData } from './../Models/i-access-data';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iUser } from '../Models/i-user';
import { UtenteService } from '../../utente.service';
import { Subscription } from 'rxjs';
import { iAuto } from '../Models/i-auto';
import { AutoService } from '../../auto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iRegisterAuto } from '../Models/i-register-auto';
import { iApiResponseArr } from '../Models/i-api-response-arr';
import { iApiResponseObj } from '../Models/i-api-response-obj';
import { iUserAuto } from '../Models/i-user-auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userData: iAccessData | null = null;
  utente!: iUser;
  auto!: iAuto;
  isModificaAttiva = false;

  autoList: iAuto[] = [];

  constructor(
    private authService: AuthService,
    private utenteService: UtenteService,
    private autoService: AutoService,
    private formBuilder: FormBuilder,

    ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.utente = user.response;
        this.getAutoUtente(this.utente.id);
      }
    });
  }

  uploadFotoAuto(event: any, id:string) {
    const file = event.target.files[0];
    if (file) {
      this.autoService.uploadFoto(id, file).subscribe(response => {
        this.updateFotoAuto(response.response.foto, id)
      }, error => {
        console.error('Error uploading avatar:', error);
      });
    }
  }

  uploadAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.utenteService.uploadAvatar(this.utente.id, file).subscribe(response => {
        this.updateUserAvatar(response.response.avatar)
      }, error => {
        console.error('Error uploading avatar:', error);
      });
    }
  }

  updateFotoAuto(fotoUrl: string, id: string){
    const autoToUpdate = this.autoList.find(a => a.id === id);
    if(autoToUpdate){
      autoToUpdate.foto = fotoUrl;
    }
  }
  updateUserAvatar(avatarUrl: string) {
    this.utente.avatar = avatarUrl;
  }

  updateField(field: string, event: any) {
    const newValue = event.target.textContent; // Ottieni il nuovo valore modificato
    switch (field) {
      case 'nome':
        this.utente.nome = newValue;
        break;
      case 'cognome':
        this.utente.cognome = newValue;
        break;
      case 'email':
        this.utente.email = newValue;
        break;
      case 'username':
        this.utente.username = newValue;
        break;
      case 'password':
        this.utente.password = newValue;
        break;
    }
  }

  updateUtente() {
    this.utenteService.update(this.utente).subscribe(
      response => {
        console.log('Utente aggiornato con successo:', response);
        this.isModificaAttiva = false;
      },
      error => {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
      }
    );
  }

  attivaModifica(){
    this.isModificaAttiva = true;
    this.utente.password = "";
  }

  getAutoUtente(userId: string): void {
    this.utenteService.getAutoByUtenteId(userId).subscribe(
      (response: iUserAuto) => {
        this.autoList = response.response
      },
      (error) => {
        console.error('Errore nel recupero delle auto:', error);
      }
    );
  }

}
