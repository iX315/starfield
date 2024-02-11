import type { OptionsProps } from './Options';
import type { CanvasHTMLAttributes, DetailedHTMLProps } from 'react';
type CanvasProps = DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
export interface StarfieldProps extends CanvasProps {
    options?: OptionsProps;
}
export declare const Starfield: ({ options, ...restProps }: StarfieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
