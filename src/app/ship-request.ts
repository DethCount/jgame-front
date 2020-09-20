import { ProductionRequest } from './production-request'
import { ShipType } from './ship-type'

export class ShipRequest extends ProductionRequest {
    type: ShipType
    nb: number
}
