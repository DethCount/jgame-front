import { ProductionRequestStatus } from './production-request-status'
import { Game } from './game'
import { ProductionRequest } from './production-request'

export class ProductionRequestObserver {
    id: number
    startedAt: Date
    finishedAt: Date
    status: ProductionRequestStatus
    game: Game

    constructor(
        id: number,
        startedAt: Date,
        finishedAt: Date,
        status: ProductionRequestStatus,
        game: Game
    ) {
        this.id = id
        this.startedAt = startedAt
        this.finishedAt = finishedAt
        this.status = status
        this.game = game
    }
}
