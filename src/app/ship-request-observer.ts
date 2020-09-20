import { ProductionRequestObserver } from './production-request-observer'
import { ShipRequest } from './ship-request'

export class ShipRequestObserver extends ProductionRequestObserver {
    nbDone: number
    unitLeadTime: number
    request: ShipRequest
}
