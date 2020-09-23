import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
    @Input() game: Game
}
