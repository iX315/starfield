import { Star } from './Star'

export class StarFactory {
    store: Star[]

    x_save: any
    y_save: any
    speed_save = 0

    constructor(count: Number, width: number, height: number, startX: number, startY: number, startZ: number) {
        this.store = new Array()

        // prepare stars array
        for (var i = 0; i < count; i++) {
            let x = Math.random() * width * 2 - startX * 2
            let y = Math.random() * height * 2 - startY * 2
            let z = Math.round(Math.random() * startZ)

            this.store[i] = <Star> {
                x, y, z, from: 0, to: 0
            }
        }

        return this
    }
}