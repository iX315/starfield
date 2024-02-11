import {useEffect, useRef} from 'react'

import {Starfield as StarfieldClass} from './Starfield'

import type {OptionsProps} from './Options'
import type {CanvasHTMLAttributes, DetailedHTMLProps} from 'react'

type CanvasProps = DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

export interface StarfieldProps extends CanvasProps {
  options?: OptionsProps
}

export const Starfield = ({options = {}, ...restProps}: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const StarfieldInstance = useRef<StarfieldClass>(null!)

  useEffect(() => {
    if (canvasRef.current) {
      StarfieldInstance.current = new StarfieldClass(canvasRef.current, options)
      StarfieldInstance.current.start()
    }
  }, [canvasRef])

  useEffect(() => {
    if (StarfieldInstance.current) {
      StarfieldInstance.current.setOptions(options)
    }
  }, [options])

  return (
    <canvas
      ref={canvasRef}
      {...restProps}
    >
    </canvas>
  )
}
