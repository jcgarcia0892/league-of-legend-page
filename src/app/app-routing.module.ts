import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./league-of-legends/league-of-legends-routing.module').then(m => m.LeagueOfLegendsRoutingModule),
  }
];
