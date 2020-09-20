import { ProductionRequest } from './production-request'
import { ConstructionType } from './construction-type'
import { Game } from './game'

export class ConstructionRequest extends ProductionRequest {
    type: ConstructionType
    level: number

    constructor(type: ConstructionType, level: number, game: Game, id: number) {
        super(id, game);

        this.type = type;
        this.level = level;
    }
}
