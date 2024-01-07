import Color from 'color'

export class Options {
  color_ratio?: number = 5
  amount?: number = 2000
  opacity?: number = 0.8
  spread?: number = 256
  speed?: number = 2
  color?: Color = Color.rgb(241, 231, 192)
  backgroundColor?: Color = Color.rgb(32, 35, 45)
  fps?: number = 30
  useMouse?: boolean = false
  useArrowKeys?: boolean = false
  showDebug?: boolean = false

  constructor(options: Options) {
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = options[key]
      }
    }
  }
}
