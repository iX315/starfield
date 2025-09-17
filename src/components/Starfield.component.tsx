import { useEffect, useRef } from 'react'

import { Starfield as StarfieldClass } from '../lib/starfield'

import type { Options } from '../lib/options'
import type { CanvasHTMLAttributes, DetailedHTMLProps } from 'react'

type CanvasProps = DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

export interface StarfieldProps extends CanvasProps {
  options?: Options
}

export const Starfield = ({ options = {}, ...restProps }: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>()
  const starfield = useRef<StarfieldClass>()

  useEffect(() => {
    if (canvasRef.current) {
      if (!starfield.current) {
        starfield.current = new StarfieldClass(canvasRef.current, options)
      }
      starfield.current.start()
    }
  }, [canvasRef, options])

  return (
    <canvas
      ref={canvasRef}
      {...restProps}
    >
    </canvas>
  )
}
