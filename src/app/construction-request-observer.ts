import { ProductionRequestObserver } from './production-request-observer'
import { ConstructionRequest } from './construction-request'

export class ConstructionRequestObserver extends ProductionRequestObserver {
    unitLeadTime: number
    request: ConstructionRequest
}
