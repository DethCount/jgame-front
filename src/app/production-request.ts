import { AdministrableLocation } from './administrable-location'

export class ProductionRequest {
    id: number
    administrableLocation: AdministrableLocation

    constructor(
        id: number,
        administrableLocation: AdministrableLocation
    ) {
        this.id = id;
        this.administrableLocation = administrableLocation;
    }
}
