import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CreaAutoComponent } from './crea-auto/crea-auto.component';
import { ModificaAutoComponent } from './modifica-auto/modifica-auto.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'crea-auto', component: CreaAutoComponent
  },
  {
    path: 'modifica-auto/:id', component: ModificaAutoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
