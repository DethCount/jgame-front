import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Game } from '../game'
import { ProductionRequest } from '../production-request'

import { EntitySerializerService } from '../entity-serializer.service'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl: string = "http://localhost:8080/game"

  constructor(
    private http: HttpClient,
    private serializerService: EntitySerializerService
  ) { }

  get(id: number) {
    return this.http.get<Game>(this.baseUrl + "/" + id)
      .pipe(
        map((data: Game) => {
          return this.serializerService.deserialize<Game>(Object.assign(new Game(), data));
        })
      );
  }
}
