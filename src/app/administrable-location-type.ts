import { ConstructionType } from './construction-type'
import { ShipType } from './ship-type'

export class AdministrableLocationType {
    id: number
    name: string
    canConstructBuildings: boolean = false
    canBuildShips: boolean = false
    constructions: ConstructionType[]
    ships: ShipType[]
    //researches: Research[]
}
