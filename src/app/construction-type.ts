import { ConstructionTypeLevel } from './construction-type-level'
import { AdministrableLocationType } from './administrable-location-type'

export class ConstructionType {
    id: number
    name: string
    levels: ConstructionTypeLevel[]
    administrableLocationType: AdministrableLocationType
}
