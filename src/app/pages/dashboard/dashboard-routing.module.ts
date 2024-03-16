import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ModificaUtenteComponent } from './modifica-utente/modifica-utente.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'modifica-utente/:id', component: ModificaUtenteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
