import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionComponent } from './views/champion/champion.component';
import { ChampionsComponent } from './views/champions/champions.component';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';
import { RulesComponent } from './views/rules/rules.component';

const routes: Routes = [
  { 
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'champions', component: ChampionsComponent },
      { path: 'champion/:id', component: ChampionComponent },
      { path: 'rules', component: RulesComponent },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'main/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueOfLegendsRoutingModule { }
