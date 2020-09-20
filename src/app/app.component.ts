import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { TranslateService } from '@ngx-translate/core'

import { Game } from './game'
import { GameService } from './game/game.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title: string = 'Jgame'
  game: Game
  isLoaded: boolean = false

  refreshSchedulesFrom = {
    'constructionProduction': {},
    'shipProduction': {}
  }

  nextRefresh: number

  constructor(
    private gameService: GameService,
    translate: TranslateService
  ) {
    translate.use('fr');
  }

  ngOnInit() {
      this.gameService.get(1)
          .subscribe((data: Game) => {
              this.game = data
              console.log(this.game)
              this.isLoaded = true
              this.scheduleRefreshFromObservers(data)
          })
  }

  refreshGame() {
    //this.isLoaded = false
    this.gameService.get(this.game.id)
      .subscribe((data: Game) => {
        this.game = data
        //this.isLoaded = true;
        this.scheduleRefreshFromObservers(data);
      })
  }

  onBuild($event) {
    if (this.nextRefresh == undefined || this.nextRefresh < (new Date).getTime() + 50) {
      setTimeout(this.refreshGame.bind(this), 500);
    } else {
      this.scheduleRefreshFromObservers($event);
    }
  }

  /*
   * Keep track of next tick for each observer and refresh it if necessary
   * remove stopped observers
   * then use the nearest tick for scheduling next refresh
   * min time is 50ms
   */
  scheduleRefreshFromObservers(game) {
    let now = (new Date).getTime();

    let vals = [], ids = [];
    for (let production in this.refreshSchedulesFrom) {
      if (game[production].length <= 0) {
        continue;
      }

      for (let observer of game[production]) {
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
      setTimeout(this.refreshGame.bind(this), dt);
      break;
    }
  }
}
