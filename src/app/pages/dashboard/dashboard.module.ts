import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreaAutoComponent } from './crea-auto/crea-auto.component';
import { ModificaAutoComponent } from './modifica-auto/modifica-auto.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreaAutoComponent,
    ModificaAutoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ]
})
export class DashboardModule { }
