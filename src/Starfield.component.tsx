import {useEffect, useRef} from 'react'

import {Starfield as StarfieldClass} from './Starfield'

import type {Options} from './Options'
import type {CanvasHTMLAttributes, DetailedHTMLProps} from 'react'

type CanvasProps = DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

export interface StarfieldProps extends CanvasProps {
  options?: Options
}

export const Starfield = ({options = {}, ...restProps}: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  useEffect(() => {
    if (canvasRef.current) {
      new StarfieldClass(canvasRef.current, options)
    }
  }, [canvasRef])

  return (
    <canvas
      ref={canvasRef}
      {...restProps}
    >
    </canvas>
  )
}
