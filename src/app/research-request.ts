import { Research } from './research'
import { AdministrableLocation } from './administrable-location'
import { ProductionRequest } from './production-request'

export class ResearchRequest extends ProductionRequest {
    type: Research
    level: number

    constructor(
        type: Research,
        level: number,
        administrableLocation: AdministrableLocation,
        id: number
    ) {
        super(id, administrableLocation)

        this.type = type
        this.level = level
    }
}
