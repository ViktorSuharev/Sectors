import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sector } from '../model/sector.model';
import { Observable } from 'rxjs';
import { Involvement } from '../model/involvement.model';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  private static readonly BASE_URL: string = 'http://localhost:8080/';

  constructor(private client: HttpClient) { }

  public getSectors(): Observable<Sector[]> {
    return this.client.get<Sector[]>(SectorsService.BASE_URL + 'sectors');
  }

  public getSessionInvolvement(): Observable<Involvement> {
    return this.client.get<Involvement>(SectorsService.BASE_URL + 'involvements/session');
  }

  public createInvolvement(involvement: Involvement): Observable<Involvement> {
    return this.client.post<Involvement>(SectorsService.BASE_URL + 'involvements', involvement);
  }

  public edit(sector: Sector): Observable<Sector> {
    return this.client.put<Sector>(SectorsService.BASE_URL + 'sectors', sector);
  }

  public add(sector: Sector): Observable<Sector> {
    return this.client.post<Sector>(SectorsService.BASE_URL + 'sectors', sector);
  }

  public remove(sectorId?: number): Observable<void> {
    return this.client.delete<void>(SectorsService.BASE_URL + `sectors/${sectorId}`);
  }
}
