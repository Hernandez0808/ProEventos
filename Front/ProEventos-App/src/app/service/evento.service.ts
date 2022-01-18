import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getEventoByTema(tema:string): Observable<Evento[]>{

    return this.http.get<Evento[]>(this.baseUrl + "/EventoTema/" + tema);
  }

  getEventoById(id:number): Observable<Evento> {
    return this.http.get<Evento>(this.baseUrl + "/EventoId/" + id);
  }
}
