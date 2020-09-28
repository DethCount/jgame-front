import { ConstructionType } from './construction-type'
import { ShipType } from './ship-type'
import { Research } from './research'

export class AdministrableLocationType {
    id: number
    name: string
    canConstructBuildings: boolean = false
    canBuildShips: boolean = false
    canDoResearch: boolean = false
    constructions: ConstructionType[]
    ships: ShipType[]
    researches: Research[]
}
