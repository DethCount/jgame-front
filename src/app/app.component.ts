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

  constructor(
    private gameService: GameService,
    translate: TranslateService
  ) {
    translate.use('fr');
  }

  ngOnInit() {
      this.gameService.get(1)
          .subscribe((data) => {
              this.game = data
              console.log('app.component.ngOnInit', data)
              this.isLoaded = true
          })
  }

  onGameNeedsRefresh($event) {
    console.log('onGameNeedsRefresh', $event);
    this.refreshGame();
  }

  refreshGame() {
    console.log('refreshGame');
    // this.isLoaded = false
    this.gameService.get(this.game.id)
      .subscribe((data: Game) => {
        this.game = data
        // this.isLoaded = true;
      })
  }
}
