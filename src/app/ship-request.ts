import { AdministrableLocation } from './administrable-location'
import { ProductionRequest } from './production-request'
import { ShipType } from './ship-type'

export class ShipRequest extends ProductionRequest {
    type: ShipType
    nb: number

    constructor(
        type: ShipType,
        nb: number,
        administrableLocation: AdministrableLocation,
        id: number
    ) {
        super(id, administrableLocation)

        this.type = type
        this.nb = nb
    }
}


