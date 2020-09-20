import { ShipRequestObserver } from './ship-request-observer'
import { ConstructionRequestObserver } from './construction-request-observer'

export class Game {
    id: number
    player: string
    score: number
    ships: object
    constructions: object
    shipProduction: ShipRequestObserver[]
    constructionProduction: ConstructionRequestObserver[]
}
