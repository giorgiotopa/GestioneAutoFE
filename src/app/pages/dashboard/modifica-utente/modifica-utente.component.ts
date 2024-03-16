import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { UtenteService } from '../../../utente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifica-utente',
  templateUrl: './modifica-utente.component.html',
  styleUrl: './modifica-utente.component.scss'
})
export class ModificaUtenteComponent {

  utente!: iUser;

  constructor(
    private utenteService: UtenteService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.utenteService.getById(id).subscribe(response => {
        this.utente = response.response;
        console.log(this.utente);

      });
    }
  }

  onSubmit() {
    this.utenteService.update(this.utente).subscribe(response => {
      console.log('Utente aggiornato con successo:', response);
      // Puoi aggiungere del codice per gestire il successo della modifica, ad esempio reindirizzando l'utente o mostrando un messaggio di successo
    }, error => {
      console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      // Puoi gestire gli errori qui, ad esempio mostrando un messaggio di errore all'utente
    });
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
      // Aggiungi altri casi per altri campi se necessario
    }
  }

  updateUtente() {
    // Chiamata al metodo update del servizio UtenteService per aggiornare le informazioni dell'utente
    this.utenteService.update(this.utente).subscribe(
      response => {
        console.log('Utente aggiornato con successo:', response);
        // Eventuali azioni aggiuntive dopo l'aggiornamento dell'utente
      },
      error => {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
        // Gestione degli errori
      }
    );
  }

}
