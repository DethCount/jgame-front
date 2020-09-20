import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { Game } from '../game'
import { GameService } from '../game/game.service'
import { ShipType } from '../ship-type'
import { ShipRequest } from '../ship-request'

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.sass']
})
export class ShipComponent implements OnInit {
  @Input() game: Game
  @Input() type: string
  @Input() nb: number

  @Output() onbuild = new EventEmitter<Game>()

  realType: ShipType
  tooltip: string = ""

  constructor(
    private translate: TranslateService,
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    this.realType = ShipType[this.type]
    this.translate.get(this.type)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

  buildNextLevel(event) {
    this.gameService.pushToProd(
      "Shipyard",
      new ShipRequest(
        this.realType,
        1,
        this.game,
        undefined
      )
    )
      .subscribe((data: Game) => {
        this.onbuild.emit(data);
      });
  }
}
