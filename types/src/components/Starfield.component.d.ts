import { Options } from '../lib/options';
import { CanvasHTMLAttributes, DetailedHTMLProps } from 'react';
type CanvasProps = DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
export interface StarfieldProps extends CanvasProps {
    options?: Options;
}
export declare const Starfield: ({ options, ...restProps }: StarfieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
