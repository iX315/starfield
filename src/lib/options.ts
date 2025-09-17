import Color from 'color'

import type { ColorInstance } from 'color'

export class Options {
  color_ratio: number = 5
  amount: number = 2000
  opacity: number = 0.8
  spread: number = 256
  speed: number = 2
  color: ColorInstance = Color.rgb(241, 231, 192)
  backgroundColor: ColorInstance = Color.rgb(32, 35, 45)
  fps: number = 30
  useMouse: boolean = false
  useArrowKeys: boolean = false
  showDebug: boolean = false

  constructor({ color, backgroundColor, ...restOptions }: Partial<Options>) {
    if (color) this.color = new Color(color)
    if (backgroundColor) this.backgroundColor = new Color(backgroundColor)
    Object.assign(this, restOptions)
  }
}
