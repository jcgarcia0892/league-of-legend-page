import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChampionsObject } from '../interfaces/champions.interface';

@Injectable({
  providedIn: 'root'
})
export class ChampionsDataService {

  baseUrl: string = 'https://ddragon.leagueoflegends.com/cdn';

  constructor(
    private http: HttpClient
  ) { }


  getChampions(): Observable<ChampionsObject> {
    return this.http.get<ChampionsObject>(`${this.baseUrl}/11.19.1/data/es_ES/champion.json`);
  }


  getChampion(id:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/11.19.1/data/es_ES/champion/${id}.json`);
  }
}