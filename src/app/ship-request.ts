import { Game } from './game'
import { ProductionRequest } from './production-request'
import { ShipType } from './ship-type'

export class ShipRequest extends ProductionRequest {
    type: ShipType
    nb: number

    constructor(type: ShipType, nb: number, game: Game, id: number) {
        super(id, game)

        this.type = type
        this.nb = nb
    }
}


