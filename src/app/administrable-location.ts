import { AdministrableLocationType } from './administrable-location-type'
import { Game } from './game'
import { ShipRequestObserver } from './ship-request-observer'
import { ConstructionRequestObserver } from './construction-request-observer'

export class AdministrableLocation {
    id: number
    name: string
    slug: string
    lastResourceUpdate: Date
    type: AdministrableLocationType
    game: number
    ships: object
    constructions: object
    shipProduction: ShipRequestObserver[]
    constructionProduction: ConstructionRequestObserver[]
}
