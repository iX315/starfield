import { CanvasContainer } from './CanvasContainer'
import { Coords } from './Starfield'

export interface MoveParams {
    container: CanvasContainer
    changeRate: Coords
    currentPos: Coords
    speed: number
    spread: number
    color_ratio: number
    maxZ: number
}

interface StarProps extends Coords {
    from?: number
    to?: number
}

export class Star {
    x: number
    y: number
    z: number
    from?: number
    to?: number
    out_of_view: boolean = false

    constructor(props: StarProps) {
        this.x = props.x
        this.y = props.y
        this.z = props.z
    }

    move({
        container,
        changeRate,
        currentPos,
        speed,
        spread,
        color_ratio,
        maxZ
    }: MoveParams) {
        this.out_of_view = false
        const new_coords = {
            x: this.from,
            y: this.to
        }

        this.moveX(changeRate.x, currentPos.x, container.width)
        this.moveY(changeRate.y, currentPos.y, container.height)
        this.moveZ(speed, maxZ)

        this.from = Math.round(currentPos.x + (this.x / this.z) * spread)
        this.to = Math.round(currentPos.y + (this.y / this.z) * spread)

        if (
            new_coords.x > 0 && new_coords.x < container.width &&
            new_coords.y > 0 && new_coords.y < container.height &&
            !this.out_of_view
        ) {
            container.context.lineWidth = (1 - color_ratio * this.z) * 2
            container.context.beginPath()
            container.context.moveTo(new_coords.x, new_coords.y)
            container.context.lineTo(this.from, this.to)
            container.context.stroke()
            container.context.closePath()
        }
    }

    moveX(rate: number, current: number, width: number) {
        this.x += rate >> 4
        if (this.x > current << 1) {
            this.x -= width << 1
            this.out_of_view = true
        }
        if (this.x < -current << 1) {
            this.x += width << 1
            this.out_of_view = true
        }
    }

    moveY(rate: number, current: number, height: number) {
        this.y += rate >> 4
        if (this.y > current << 1) {
            this.y -= height << 1
            this.out_of_view = true
        }
        if (this.y < -current << 1) {
            this.y += height << 1
            this.out_of_view = true
        }
    }

    moveZ(speed: number, current: number) {
        this.z -= speed
        if (this.z > current) {
            this.z -= current
            this.out_of_view = true
        }
        if (this.z < 0) {
            this.z += current
            this.out_of_view = true
        }
    }
}