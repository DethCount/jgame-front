import { ShipRequestObserver } from './ship-request-observer'
import { ConstructionRequestObserver } from './construction-request-observer'
import { AdministrableLocation } from './administrable-location'

export class Game {
    id: number
    player: string
    score: number
    administrableLocations: AdministrableLocation[]
}
