import { ProductionRequest } from './production-request'
import { ConstructionType } from './construction-type'
import { AdministrableLocation } from './administrable-location'

export class ConstructionRequest extends ProductionRequest {
    type: ConstructionType
    level: number

    constructor(
        type: ConstructionType,
        level: number,
        administrableLocation: AdministrableLocation,
        id: number
    ) {
        super(id, administrableLocation);

        this.type = type;
        this.level = level;
    }
}
