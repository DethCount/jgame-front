import { Game } from './game'
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
        game: Game,
        id: number
    ) {
        super(
            id,
            startedAt,
            finishedAt,
            status,
            game
        );

        this.unitLeadTime = unitLeadTime
        this.request = request
    }
}
