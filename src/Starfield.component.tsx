import type { Options } from './Options'
import {Starfield as StarfieldClass} from './Starfield'
import {CanvasHTMLAttributes, DetailedHTMLProps, useEffect, useRef} from 'react'

export interface StarfieldProps extends DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
    options: Options
}

export const Starfield = ({options, ...restProps}: StarfieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    
    useEffect(() => {
        if (canvasRef.current) {
            new StarfieldClass(canvasRef.current, options)
        }
    }, [canvasRef])

    return (
        <canvas ref={canvasRef} {...restProps}></canvas>
    )
}
