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
    currentAdministrableLocationIdx: number;
    currentAdministrableLocation: AdministrableLocation;

    ngOnInit() {
        this.changeCurrentAdministrableLocation(0);
    }

    changeCurrentAdministrableLocation(idx) {
        this.currentAdministrableLocationIdx = idx
        this.currentAdministrableLocation = this.game.administrableLocations[
            this.currentAdministrableLocationIdx
        ]

        console.log(this.currentAdministrableLocationIdx, this.currentAdministrableLocation);
    }
}
