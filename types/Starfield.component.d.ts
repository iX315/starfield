import type { Options } from './Options';
import { CanvasHTMLAttributes, DetailedHTMLProps } from 'react';
export interface StarfieldProps extends DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
    options: Options;
}
export declare const Starfield: ({ options, ...restProps }: StarfieldProps) => import("react").JSX.Element;
