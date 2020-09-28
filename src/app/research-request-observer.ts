import { ProductionRequestObserver } from './production-request-observer'
import { ProductionRequestStatus } from './production-request-status'
import { AdministrableLocation } from './administrable-location'
import { ResearchRequest } from './research-request'

export class ResearchRequestObserver extends ProductionRequestObserver {
    unitLeadTime: number
    request: ResearchRequest

    constructor(
        nbDone: number,
        unitLeadTime: number,
        request: ResearchRequest,
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
