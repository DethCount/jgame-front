import { Injectable } from '@angular/core'

import { AdministrableLocationType } from './administrable-location-type'
import { AdministrableLocation } from './administrable-location'
import { ConstructionRequestObserver } from './construction-request-observer'
import { ConstructionRequest } from './construction-request'
import { ConstructionTypeLevel } from './construction-type-level'
import { ConstructionType } from './construction-type'
import { Game } from './game'
import { ResearchRequestObserver } from './research-request-observer'
import { ResearchRequest } from './research-request'
import { Research } from './research'
import { ShipRequestObserver } from './ship-request-observer'
import { ShipRequest } from './ship-request'
import { ShipType } from './ship-type'

const MODEL = {
  "AdministrableLocationType": AdministrableLocationType,
  "AdministrableLocation": AdministrableLocation,
  "ConstructionRequestObserver": ConstructionRequestObserver,
  "ConstructionRequest": ConstructionRequest,
  "ConstructionTypeLevel": ConstructionTypeLevel,
  "ConstructionType": ConstructionType,
  "Game": Game,
  "ResearchRequestObserver": ResearchRequestObserver,
  "ResearchRequest": ResearchRequest,
  "Research": Research,
  "ShipRequestObserver": ShipRequestObserver,
  "ShipRequest": ShipRequest,
  "ShipType": ShipType
};

class SerializationContext {
  stack = []
  refs = []
  db: object = {}
}

@Injectable({
  providedIn: 'root'
})
export class EntitySerializerService {
  refRegex: RegExp = /^(?<id>\d+)@(?<class>\w+)$/
  idProperty: string = "@id"

  public serialize(data: object, className?: string) {
    console.log('serialize', data, className);

    data = this.serializeJson(new SerializationContext, data, className)

    console.log('serialize end', data);

    return data;
  }

  public deserialize<T>(data: T) {
    console.log('deserialize', data);
    let context = new SerializationContext

    this.extractEntities(context, data, [])

    data = this.populateDbAndSerializeEntities(context, data)

    data = this.replaceRefs(context, data)

    console.log('deserialize end', data);

    return data
  }

  private extractEntities(context: SerializationContext, data: any, path: string[]) {
    if (typeof data == "string"
      && this.refRegex.test(data)
      && path.length > 0
    ) {
        context.refs.push({
          'id': data,
          'path': [].concat(path)
        })

        return;
    }

    if (data instanceof Array) {
      for (let idx in data) {
        let tmpPath = [].concat(path);
        tmpPath.push(idx);

        this.extractEntities(context, data[idx], tmpPath);
      }

      return;
    }

    if (!(data instanceof Object)) {
      return;
    }

    if (data.hasOwnProperty(this.idProperty) && typeof data[this.idProperty] == "string") {
      context.stack.push({
        'id': data[this.idProperty],
        'path': [].concat(path),
        'data': data
      });

      delete data[this.idProperty];
    }

    for (let idx in data) {
      let tmpPath = [].concat(path)
      tmpPath.push(idx);

      this.extractEntities(context, data[idx], tmpPath)
    }
  }

  private instanciateModel(className: string, checkExisting?: boolean) {
    if (checkExisting !== false && !MODEL.hasOwnProperty(className)) {
      throw new Error("Model not found: " + className)
    }

    if (!(MODEL[className] instanceof Function)) {
      throw new Error("Model has no constructor: " + className)
    }

    return new MODEL[className]
  }

  private populateDbAndSerializeEntities(context: SerializationContext, data: any) {
    for (let i = context.stack.length - 1; i >= 0; i--) {
      let matches = context.stack[i]['id'].match(this.refRegex);
      let obj = {};
      if (MODEL.hasOwnProperty(matches['groups']['class'])) {
        obj = this.instanciateModel(matches['groups']['class'], false);
      }

      context.db[context.stack[i]['id']] = this.deserializeJson(
        context.stack[i]['data'],
        context.stack[i]['path'],
        obj
      );

      // console.log('populateDbAndSerializeEntities', context.stack[i]);
      this.modifyDeeply(
        data,
        context.stack[i]['path'],
        context.db[context.stack[i]['id']]
      );
    }

    return data;
  }

  private modifyDeeply(data: any, path: string[], value: any) {
    // console.log('modifyDeeply', data, path, value);
    if (path.length == 0 && data instanceof Object) {
      // console.log(path.join('/'), value);
      Object.assign(data, value);

      return data;
    }

    let tmpPath = [].concat(path);
    let idx = tmpPath.shift();

    if (tmpPath.length == 0) {
      data[idx] = value;
      return;
    }

    this.modifyDeeply(data[idx], tmpPath, value);
  }

  private serializeJson(context: SerializationContext, data: any, className?: string) {
    if (data instanceof Array) {
      let arr = [];
      for (let idx in data) {
        arr[idx] = this.serializeJson(context, data[idx]);
      }
      return arr;
    } else if (data instanceof Object) {
      let obj = {};

      if (data.hasOwnProperty('id')) {
        let id = data['id']
            + '@' + (className != undefined ? className : data.constructor.name);

        if (context.db.hasOwnProperty(id)) {
          return id;
        }

        context.db[id] = true;
        obj["@id"] = id;
      }

      for (let idx in data) {
        obj[idx] = this.serializeJson(context, data[idx]);
      }

      return obj;
    }

    if (typeof data == "string" && this.refRegex.test(data)) {
      let matches = data.match(this.refRegex);

      if (context.db.hasOwnProperty(data)) {
        console.log(context.db[data]);
        return context.db[data];
      }

      let obj = this.instanciateModel(matches['groups']['class']);
      obj['id'] = matches['groups']['id'];

      return obj;
    }

    return data;
  }

  private deserializeJson(data: any, path: string[], obj?: object) {
    if (data instanceof Array) {
      let res = [];

      for (let idx in data) {
        let tmpPath = [].concat(path);
        tmpPath.push(idx);
        res[idx] = this.deserializeJson(data[idx], tmpPath, obj);
      }

      return res;
    }

    if (undefined == obj) {
      return data;
    }

    if (obj instanceof Object) {
      for (let idx in data) {
        obj[idx] = data[idx];
      }

      return obj
    }

    return data;
  }

  private replaceRefs(context: SerializationContext, data: any) {
    console.log('replaceRefs', context);
    for (let i = 0; i < context.refs.length; i++) {
      let val;

      if (context.db.hasOwnProperty(context.refs[i]['id'])) {
        val = context.db[context.refs[i]['id']];
      } else {
        let matches = context.refs[i]['id'].match(this.refRegex);
        val = this.instanciateModel(matches['groups']['class']);
        val['id'] = matches['groups']['id'];
      }

      this.modifyDeeply(
        data,
        [].concat(context.refs[i]['path']),
        val
      );
    }

    return data;
  }
}
