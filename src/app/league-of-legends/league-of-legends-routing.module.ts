import { NgModule } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { ChampionComponent } from './views/champion/champion.component';
import { ChampionsComponent } from './views/champions/champions.component';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';
import { RulesComponent } from './views/rules/rules.component';

const getChampionName: ResolveFn<string> = (route, state) => {
  console.log({route, state});
  return route.params['id'];
}

const routes: Routes = [
  { 
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'champions', component: ChampionsComponent, title: 'Champions' },
      { path: 'champion/:id', component: ChampionComponent, title: getChampionName },
      { path: 'rules', component: RulesComponent, title: 'Rules' },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'main/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class LeagueOfLegendsRoutingModule { }
