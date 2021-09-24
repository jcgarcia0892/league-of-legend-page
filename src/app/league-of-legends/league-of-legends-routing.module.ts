import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionsComponent } from './views/champions/champions.component';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  { 
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'champions', component: ChampionsComponent },

    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'main/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueOfLegendsRoutingModule { }
