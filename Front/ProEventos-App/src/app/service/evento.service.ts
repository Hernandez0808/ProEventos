import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl = environment.urlApi + "Eventos";

  constructor(private http:HttpClient) { }


  getEvento(): Observable<Evento[]>{

    return this.http.get<Evento[]>(this.baseUrl);
  }

  getEventoById(id:number): Observable<Evento> {
    return this.http.get<Evento>(this.baseUrl + "/EventoId/" + id)
      .pipe(take(1));
  }

  getEventoByTema(tema:string): Observable<Evento[]>{

    return this.http.get<Evento[]>(this.baseUrl + "/EventoTema/" + tema)
      .pipe(take(1));
  }

  postEvento(evento:Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseUrl,evento)
      .pipe(take(1));
  }

  putEvento(evento:Evento): Observable<Evento> {
    return this.http.put<Evento>(this.baseUrl + "/EventoUpdate/" + evento.id, evento)
      .pipe(take(1));
  }

  deleteEvento(id:number): Observable<any> {
    return this.http.delete(this.baseUrl + "/DeleteEvento/" + id)
      .pipe(take(1));
  }
}
