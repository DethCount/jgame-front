import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdministrableLocation } from '../administrable-location'
import { AdministrableLocationType } from '../administrable-location-type'
import { AdministrableLocationService } from './administrable-location.service'
import { ConstructionComponent } from '../construction/construction.component'

@Component({
  selector: 'app-administrable-location',
  templateUrl: './administrable-location.component.html',
  styleUrls: ['./administrable-location.component.sass']
})
export class AdministrableLocationComponent implements OnInit {
  @Input() administrableLocation : AdministrableLocation
  @Output() refresh = new EventEmitter<AdministrableLocation>()
  @Output() builtAdministrableLocation = new EventEmitter<AdministrableLocation>()

  refreshSchedulesFrom = {
    'constructionProduction': {},
    'shipProduction': {},
    'researchProduction': {}
  }

  nextRefresh: number

  constructor(private service: AdministrableLocationService) {}

  ngOnInit() {
    console.log('init administrable-location', this.administrableLocation);
    //console.log('builtAdministrableLocation observers: ', this.builtAdministrableLocation.observers.length);
    this.scheduleRefreshFromObservers(this.administrableLocation)
  }

  onBuild($event) {
    console.log('onBuild', $event);
    if (this.nextRefresh == undefined
      || this.nextRefresh < (new Date).getTime() + 50
    ) {
      setTimeout(this.doRefresh.bind(this), 500);
    } else {
      this.scheduleRefreshFromObservers($event.administrableLocation);
    }
  }

  doRefresh() {
    console.log('administrableLocation refresh');
    this.service.get(
      this.administrableLocation.game.id,
      this.administrableLocation.path
    )
      .subscribe((data: AdministrableLocation) => {
        console.log('administrableLocation refresh subscribe', data);

        let newAdministrableConstruction
          = this.hasNewAdministrableConstruction(data);
        this.administrableLocation = data

        if (newAdministrableConstruction) {
          this.builtAdministrableLocation.emit(this.administrableLocation)
          console.log('builtAdministrableLocation emitted', this.administrableLocation);
        } else {
          this.scheduleRefreshFromObservers(data)
        }

        this.refresh.emit(data);
      })
  }

  /*
   * Keep track of next tick for each observer and refresh it if necessary
   * remove stopped observers
   * then use the nearest tick for scheduling next refresh
   * min time is 50ms
   */
  private scheduleRefreshFromObservers(administrableLocation: AdministrableLocation) {
    console.log('scheduleRefreshFromObservers', administrableLocation);
    let now = (new Date).getTime();

    let vals = [], ids = [];
    for (let production in this.refreshSchedulesFrom) {
      if (administrableLocation[production].length <= 0) {
        continue;
      }

      for (let observer of administrableLocation[production]) {
        if (observer.status == 'Running' || observer.status == 'Waiting') {
          ids.push(observer.id);
          if (
            !this.refreshSchedulesFrom[production].hasOwnProperty(observer.id)
            || this.refreshSchedulesFrom[production][observer.id] <= now
          ) {
            this.refreshSchedulesFrom[production][observer.id]
              = now + observer.unitLeadTime * 1000;
          }
        }
      }

      for (let id in this.refreshSchedulesFrom[production]) {
        if (ids.indexOf(Number(id)) <= -1) {
          delete this.refreshSchedulesFrom[production][id];
        }
      }

      vals.push.apply(vals, Object.values(this.refreshSchedulesFrom[production]));
    }

    for (let t of new Set(vals.sort())) {
      let dt = t - (new Date()).getTime();
      if (dt < 50) {
        continue;
      }

      console.log('nextRefresh', this.nextRefresh, t);
      if (undefined != this.nextRefresh && now < this.nextRefresh + 50) {
        console.log('ignore');
        continue;
      }

      this.nextRefresh = t;

      console.log('next tick in ', dt, this.refreshSchedulesFrom);
      setTimeout(this.doRefresh.bind(this), dt);
      break;
    }
  }

  // detect new construction creating a new administrable location
  // in otder to refresh locations list
  private hasNewAdministrableConstruction(data: AdministrableLocation) {
    let nbAdministrableLocations = 0;
    let administrableConstructionTypes = [];

    for (let construction of data.type.constructions) {
      if (construction.administrableLocationType) {
        administrableConstructionTypes.push(construction.name)
      }
    }

    let newAdministrableLocation = false;
    for (let construction of administrableConstructionTypes) {
      if (data.constructions[construction] == 1
        && this.administrableLocation.constructions[construction] == 0
      ) {
        newAdministrableLocation = true;
        break;
      }
    }

    return newAdministrableLocation;
  }
}
