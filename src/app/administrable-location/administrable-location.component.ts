import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdministrableLocation } from '../administrable-location'
import { AdministrableLocationService } from './administrable-location.service'

@Component({
  selector: 'app-administrable-location',
  templateUrl: './administrable-location.component.html',
  styleUrls: ['./administrable-location.component.sass']
})
export class AdministrableLocationComponent implements OnInit {
  @Input() administrableLocation : AdministrableLocation
  @Output() onbuild = new EventEmitter<AdministrableLocation>()

  refreshSchedulesFrom = {
    'constructionProduction': {},
    'shipProduction': {}
  }

  nextRefresh: number

  constructor(private service: AdministrableLocationService) {}

  ngOnInit() {
      this.scheduleRefreshFromObservers(this.administrableLocation)
  }

  onBuild($event) {
    if (this.nextRefresh == undefined
      || this.nextRefresh < (new Date).getTime() + 50
    ) {
      setTimeout(this.refresh.bind(this), 500);
    } else {
      this.scheduleRefreshFromObservers($event);
    }
  }

  refresh() {
    //this.isLoaded = false
    this.service.get(
      this.administrableLocation.slug,
      this.administrableLocation.game
    )
      .subscribe((data: AdministrableLocation) => {
        this.administrableLocation = data
        this.scheduleRefreshFromObservers(data)
        //this.isLoaded = true;
      })
  }

  /*
   * Keep track of next tick for each observer and refresh it if necessary
   * remove stopped observers
   * then use the nearest tick for scheduling next refresh
   * min time is 50ms
   */
  scheduleRefreshFromObservers(administrableLocation: AdministrableLocation) {
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
      setTimeout(this.refresh.bind(this), dt);
      break;
    }
  }
}
