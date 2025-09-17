import { Star } from './star'

import type { MoveParams } from './star'
import type { Coords } from './coordinates'

interface StarFactoryParams extends Coords {
  count: number
  width: number
  height: number
}

export class StarFactory {
  store: Star[]
  params: StarFactoryParams

  constructor(params: StarFactoryParams) {
    this.store = []
    this.params = params

    // prepare stars array
    for (let i = 0; i < params.count; i++) {
      this.store.push(this.createStar())
    }
  }

  createStar() {
    const x = Math.round(Math.random() * this.params.width * 2 - this.params.x * 2)
    const y = Math.round(Math.random() * this.params.height * 2 - this.params.y * 2)
    const z = Math.round(Math.random() * this.params.z)

    return new Star({ x, y, z })
  }

  destroyStar(i: number) {
    this.store.splice(i, 1, this.createStar())
  }

  move(params: MoveParams) {
    for (let i = 0; i < this.store.length; i++) {
      this.store[i].move(params)
      if (this.store[i].out_of_view) {
        this.destroyStar(i)
      }
    }
  }
}