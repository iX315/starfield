import type { CanvasContainer } from './canvasContainer'
import type { Coords } from './coordinates'

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
  from: number
  to: number
}

export class Star {
  x: number
  y: number
  z: number
  from: number = 0
  to: number = 0
  out_of_view: boolean = false

  constructor(props: StarProps) {
    this.x = props.x
    this.y = props.y
    this.z = props.z
    this.from = props.from || 0
    this.to = props.to || 0
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

    this.moveX(changeRate.x, currentPos.x, container.width)
    this.moveY(changeRate.y, currentPos.y, container.height)
    this.moveZ(speed, maxZ)

    const prevFrom = this.from
    const prevTo = this.to
    this.from = Math.round(currentPos.x + (this.x / this.z) * spread)
    this.to = Math.round(currentPos.y + (this.y / this.z) * spread)

    const xBound = this.from > 0 && this.from < container.width
    const yBound = this.to > 0 && this.to < container.height
    if (xBound && yBound && !this.out_of_view) {
      container.context.lineWidth = (1 - color_ratio * this.z) * 2
      container.context.beginPath()
      container.context.moveTo(prevFrom, prevTo)
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