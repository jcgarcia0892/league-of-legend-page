import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueOfLegendsRoutingModule } from './league-of-legends-routing.module';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { ChampionComponent } from './views/champion/champion.component';
import { ChampionsComponent } from './views/champions/champions.component';
import { RulesComponent } from './views/rules/rules.component';
import { MainComponent } from './views/main/main.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ButtonComponent,
    CardComponent,
    ChampionComponent,
    ChampionsComponent,
    RulesComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    LeagueOfLegendsRoutingModule,
    ReactiveFormsModule
  ]
})
export class LeagueOfLegendsModule { }
