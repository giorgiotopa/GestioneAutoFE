import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { iAuto } from '../../Models/i-auto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AutoService } from '../../../auto.service';
import { iRegisterAuto } from '../../Models/i-register-auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crea-auto',
  templateUrl: './crea-auto.component.html',
  styleUrl: './crea-auto.component.scss'
})
export class CreaAutoComponent {

  utente!: iUser;
  auto!: iAuto;
  isModificaAttiva = false;
  autoForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private autoService: AutoService,
    private formBuilder: FormBuilder,
    private router: Router

    ) {}

    ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        if (user) {
          this.utente = user.response;
          console.log(this.utente);

        }
      });

      this.initAutoForm(); // Inizializza il reactive form per l'auto

    }

    initAutoForm(): void {
      this.autoForm = this.formBuilder.group({
        marca: ['', Validators.required],
        modello: ['', Validators.required],
        annoDiImmatricolazione: [null, Validators.required],
        cilindrata: [null, Validators.required],
        tipoAlimentazione: ['', Validators.required],
        descrizione: ['', Validators.required],
        prezzo: [null, Validators.required],
        foto: [''], // Non obbligatorio
      });
    }

    saveAuto(): void {
      if (this.autoForm.valid) {
        const createAuto: iRegisterAuto = this.autoForm.value;
        createAuto.utenteId = this.utente.id;

        this.autoService.create(createAuto).subscribe(
          (data) => {
            console.log('Nuova auto creata:', data);
            this.autoForm.reset();
            this.router.navigate(['/dashboard']);

          },
          (error) => {
            console.error('Errore durante la creazione dell\'auto:', error);
          }
        );
      }
    }

}
