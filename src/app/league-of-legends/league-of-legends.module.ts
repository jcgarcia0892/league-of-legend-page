import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueOfLegendsRoutingModule } from './league-of-legends-routing.module';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    LeagueOfLegendsRoutingModule,
    ReactiveFormsModule
  ]
})
export class LeagueOfLegendsModule { }
