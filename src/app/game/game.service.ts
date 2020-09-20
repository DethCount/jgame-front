import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../game';
import { ProductionRequest } from '../production-request';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<Game>(this.baseUrl + "/game/" + id);
  }

  pushToProd(listName, request: ProductionRequest) {
    console.log('pushToProd', listName, request);

    let data: object = {"_type": '.' + request.constructor.name};
    for (let attr in request) {
      if (attr == "game") {
        continue;
      }

      data[attr] = request[attr];
    }

    return this.http.post<Game>(
      this.baseUrl + "/game/" + request.game.id + "/production/" + listName,
      data
    );
  }
}
