import { iAccessData } from './../Models/i-access-data';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iUser } from '../Models/i-user';
import { UtenteService } from '../../utente.service';
import { iAuto } from '../Models/i-auto';
import { AutoService } from '../../auto.service';
import { iUserAuto } from '../Models/i-user-auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  autoSection!: any;

  userData: iAccessData | null = null;
  utente!: iUser;
  auto!: iAuto;
  isModificaAuto = false;
  isEliminaAuto = false;
  isModificaUtente = false;

  autoList!: iAuto[];

  constructor(
    private authService: AuthService,
    private utenteService: UtenteService,
    private autoService: AutoService,
    ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.utente = user.response;
        this.getAutoUtente(this.utente.id);
      }
    });

    this.autoSection = document.getElementById('autoSection');
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
        this.isModificaUtente = false;
      },
      error => {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
      }
    );
  }

  attivaModificaAuto(){
    this.isModificaAuto = true;
    this.scrollToAutoSection();
  }

  attivaEliminaAuto(){
    this.isEliminaAuto = true;
    this.scrollToAutoSection();
  }

  scrollToAutoSection() {
    if (this.autoSection) {
      this.autoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  attivaModificaUtente(){
    this.isModificaUtente = true;
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

  deleteAuto(id:string):void{
    this.autoService.delete(id).subscribe(response =>{
      console.log(response);
      const index = this.autoList.findIndex(auto => auto.id === id);
      if (index !== -1) {
        this.autoList.splice(index, 1);
      }
    },
    error => {
      console.error('Errore durante l\'eliminazione dell\'auto:', error);
    })
  }

}
