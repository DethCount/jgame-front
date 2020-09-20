import { ProductionRequestStatus } from './production-request-status'
import { Game } from './game'
import { ProductionRequest } from './production-request'

export class ProductionRequestObserver {
    id: number
    startedAt: Date
    finishedAt: Date
    status: ProductionRequestStatus
    game: Game
}
