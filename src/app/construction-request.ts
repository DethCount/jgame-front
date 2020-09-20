import { ProductionRequest } from './production-request'
import { ConstructionType } from './construction-type'

export class ConstructionRequest extends ProductionRequest {
    type: ConstructionType
    level: number
}
