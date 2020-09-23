import { ProductionRequestObserver } from './production-request-observer'
import { ProductionRequestStatus } from './production-request-status'
import { ShipRequest } from './ship-request'
import { AdministrableLocation } from './administrable-location'

export class ShipRequestObserver extends ProductionRequestObserver {
    nbDone: number
    unitLeadTime: number
    request: ShipRequest

    constructor(
        nbDone: number,
        unitLeadTime: number,
        request: ShipRequest,
        startedAt: Date,
        finishedAt: Date,
        status: ProductionRequestStatus,
        administrableLocation: AdministrableLocation,
        id: number
    ) {
        super(
            id,
            startedAt,
            finishedAt,
            status,
            administrableLocation
        );

        this.nbDone = nbDone
        this.unitLeadTime = unitLeadTime
        this.request = request
    }
}
