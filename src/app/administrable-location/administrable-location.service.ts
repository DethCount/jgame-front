import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { ProductionRequest } from '../production-request';
import { AdministrableLocation } from '../administrable-location'

@Injectable({
  providedIn: 'root'
})
export class AdministrableLocationService {
  baseUrl: string = "http://localhost:8080/at"

  constructor(private http: HttpClient) { }

  get(slug: string, gameId: number) {
    return this.http.get<AdministrableLocation>(
        this.baseUrl
          + "/" + slug
            + "-" + gameId
    );
  }

  pushToProd(request: ProductionRequest) {
    console.log('pushToProd', request);

    let data: object = {"_type": '.' + request.constructor.name};
    for (let attr in request) {
      if (attr == "game") {
        continue;
      }

      data[attr] = request[attr];
    }

    return this.http.post<AdministrableLocation>(
      this.baseUrl
        + "/" + request.administrableLocation.slug
          + "-" + request.administrableLocation.game
        + "/build",
      data
    );
  }
}
