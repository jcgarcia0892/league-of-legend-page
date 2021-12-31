import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChampionsObject } from '../interfaces/champions.interface';
import { switchMap } from 'rxjs/operators';
import { ChampionResp } from '../interfaces/champion-resp.interface';

@Injectable({
  providedIn: 'root'
})
export class ChampionsDataService {

  baseUrl: string = 'https://ddragon.leagueoflegends.com/cdn';
  constructor(
    private http: HttpClient
  ) {}
  
  getupdatedVersion(): Observable<string[]> {
    return this.http.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
  }
  
  getChampions(): Observable<ChampionsObject> {
    return this.getupdatedVersion()
      .pipe(
        switchMap((versions) =>  this.http.get<ChampionsObject>(`${this.baseUrl}/${versions[0]}/data/es_ES/champion.json`))
      )
  }

  getChampion(id:string): Observable<ChampionResp> {
    return this.getupdatedVersion()
    .pipe(
      switchMap((versions) =>  this.http.get<ChampionResp>(`${this.baseUrl}/${versions[0]}/data/es_ES/champion/${id}.json`)),
    )
  };
}
