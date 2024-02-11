import Color from 'color'

export interface OptionsProps extends Partial<Omit<Options, 'color' | 'backgroundColor'>> {
  color?: Color | string
  backgroundColor?: Color | string
}

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

  constructor(options: OptionsProps) {
    const {color, backgroundColor} = options
    if (typeof color === 'string') options.color = Color(color)
    if (typeof backgroundColor === 'string') options.backgroundColor = Color(backgroundColor)
    Object.assign(this, options)
  }
}
