import { Game } from './game'

export class ProductionRequest {
    id: number
    game: Game

    constructor(id: number, game: Game) {
        this.id = id;
        this.game = game;
    }
}
