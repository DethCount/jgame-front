import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { ConstructionType } from '../construction-type'
import { ConstructionRequest } from '../construction-request'
import { Game } from '../game'
import { GameService } from '../game/game.service'

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.sass']
})
export class ConstructionComponent implements OnInit {
  @Input() game: Game
  @Input() type: string
  @Input() level: number

  @Output() onbuild = new EventEmitter<Game>()

  realType: ConstructionType
  tooltip: string = ""

  constructor(
    private translate: TranslateService,
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    this.realType = ConstructionType[this.type];
    this.translate.get(this.type)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

  buildNextLevel(event) {
    this.gameService.pushToProd(
      "Constructions",
      new ConstructionRequest(
        this.realType,
        this.level + 1,
        this.game,
        undefined
      )
    )
      .subscribe((data: Game) => {
        this.onbuild.emit(data);
      });
  }
}
