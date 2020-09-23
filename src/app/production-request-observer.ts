import { ProductionRequestStatus } from './production-request-status'
import { AdministrableLocation } from './administrable-location'
import { ProductionRequest } from './production-request'

export class ProductionRequestObserver {
    id: number
    startedAt: Date
    finishedAt: Date
    status: ProductionRequestStatus
    administrableLocation: AdministrableLocation

    constructor(
        id: number,
        startedAt: Date,
        finishedAt: Date,
        status: ProductionRequestStatus,
        administrableLocation: AdministrableLocation
    ) {
        this.id = id
        this.startedAt = startedAt
        this.finishedAt = finishedAt
        this.status = status
        this.administrableLocation = administrableLocation
    }
}
