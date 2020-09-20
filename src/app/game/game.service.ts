import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<Game>(this.baseUrl + "/game/" + id);
  }
}