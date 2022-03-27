import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sector } from '../model/sector.model';
import { Observable } from 'rxjs';
import { Involvement } from '../model/involvement.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectorsHttpService {
  private readonly BASE_URL: string = environment.apiUrl;

  constructor(private readonly client: HttpClient) { }

  public getSectors(): Observable<Sector[]> {
    return this.client.get<Sector[]>(`${this.BASE_URL}/sectors`);
  }

  public getSessionInvolvement(): Observable<Involvement> {
    return this.client.get<Involvement>(`${this.BASE_URL}/involvements/session`);
  }

  public createInvolvement(involvement: Involvement): Observable<Involvement> {
    return this.client.post<Involvement>(`${this.BASE_URL}/involvements`, involvement);
  }

  public edit(sector: Sector): Observable<Sector> {
    return this.client.put<Sector>(`${this.BASE_URL}/sectors`, sector);
  }

  public add(sector: Sector): Observable<Sector> {
    return this.client.post<Sector>(`${this.BASE_URL}/sectors`, sector);
  }

  public remove(sectorId?: number): Observable<void> {
    return this.client.delete<void>(`${this.BASE_URL}/sectors/${sectorId}`);
  }
}
