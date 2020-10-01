import Color from 'color'

export class Options {
    amount: number
    color_ratio: number
    opacity: number
    spread: number
    speed: number
    color: Color
    backgroundColor: Color
    fps: number
    useMouse: boolean
    useArrowKeys: boolean
}

export const DefaultOptions = <Options> {
    amount: 2000,
    color_ratio: 5,
    opacity: 0.8,
    spread: 256,
    speed: 2,
    color: Color.rgb(241, 231, 192),
    backgroundColor: Color.rgb(32,35,45),
    fps: 30,
    useMouse: false,
    useArrowKeys: false,
}