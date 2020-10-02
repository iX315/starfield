import { Star, MoveParams } from './Star'
import { Coords } from './Starfield'

interface StarFactoryParams extends StarParams {
    count: number
}

interface StarParams extends Coords {
    width: number
    height: number
}

export class StarFactory {
    store: Star[]

    constructor(params: StarFactoryParams) {
        this.store = new Array()

        // prepare stars array
        for (var i = 0; i < params.count; i++) {
            this.store.push(this.createStar(params))
        }
    }

    createStar(params: StarParams) {
        let x = Math.round(Math.random() * params.width * 2 - params.x * 2)
        let y = Math.round(Math.random() * params.height * 2 - params.y * 2)
        let z = Math.round(Math.random() * params.z)

        return new Star({ x, y, z })
    }

    destroyStar() {
        // @todo
    }

    move(params: MoveParams) {
        for (var i = 0; i < this.store.length; i++) {
            this.store[i].move(params)
        }
    }
}