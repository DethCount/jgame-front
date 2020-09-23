import { AdministrableLocation } from './administrable-location'
import { ProductionRequestObserver } from './production-request-observer'
import { ProductionRequestStatus } from './production-request-status'
import { ConstructionRequest } from './construction-request'

export class ConstructionRequestObserver extends ProductionRequestObserver {

    unitLeadTime: number
    request: ConstructionRequest

    constructor(
        unitLeadTime: number,
        request: ConstructionRequest,
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

        this.unitLeadTime = unitLeadTime
        this.request = request
    }
}
