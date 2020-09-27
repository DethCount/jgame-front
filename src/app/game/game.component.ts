import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Game } from '../game';
import { AdministrableLocation } from '../administrable-location'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
    @Input() game: Game
    @Output() needsRefresh = new EventEmitter<Game>();

    currentAdministrableLocationIdx: number;
    currentAdministrableLocation: AdministrableLocation;

    ngOnInit() {
        this.changeCurrentAdministrableLocation(0);
    }

    onAdministrationLocationRefresh($event) {
        console.log('game onAdministrationLocationRefresh', $event);

        if ($event.game
            && $event.game instanceof Game
            && $event.game.administrableLocations
        ) {
            this.game = $event.game;
        }
    }

    onBuiltAdministrableLocation($event) {
        console.log('game onBuiltAdministrableLocation', $event);
        this.needsRefresh.emit(this.game);
        console.log('needsRefresh emitted', this.game);
    }

    changeCurrentAdministrableLocation(idx) {
        this.currentAdministrableLocationIdx = idx
        this.currentAdministrableLocation = this.game.administrableLocations[
            this.currentAdministrableLocationIdx
        ]

        console.log(this.currentAdministrableLocationIdx, this.currentAdministrableLocation);
    }
}
