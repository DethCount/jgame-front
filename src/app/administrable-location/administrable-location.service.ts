import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { ProductionRequest } from '../production-request'
import { AdministrableLocation } from '../administrable-location'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntitySerializerService } from '../entity-serializer.service'

@Injectable({
  providedIn: 'root'
})
export class AdministrableLocationService {

  baseUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient, private serializer: EntitySerializerService) { }

  get(gameId: number, path: string) {
    return this.http.get<any>(
        this.baseUrl
          + "/game/" + gameId
          + "/at/" + path
      )
        .pipe(
          map(data => this.serializer.deserialize<AdministrableLocation>(
              Object.assign(new AdministrableLocation(), data)
            )
          )
        )
  }

  pushToProd(request: ProductionRequest) {
    console.log('pushToProd', request);

    let data: object = {"_type": '.' + request.constructor.name};
    for (let attr in request) {
      if (attr == "game" || attr == "id") {
        continue;
      }

      if (attr == 'type') {
        data[attr] = request['type']['name'];
        continue;
      }

      data[attr] = request[attr];
    }

    data = this.serializer.serialize(data);

    return this.http.post<any>(
      this.baseUrl
        + "/game/" + request.administrableLocation.game.id
          + "/at/" + request.administrableLocation.path
        + "/build",
      data
    )
      .pipe(
        map(data => this.serializer.deserialize<AdministrableLocation>(
            Object.assign(new AdministrableLocation, data)
          )
        )
      )
  }
}
