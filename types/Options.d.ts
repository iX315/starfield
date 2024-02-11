import Color from 'color';

export interface OptionsProps extends Partial<Omit<Options, 'color' | 'backgroundColor'>> {
    color?: Color | string;
    backgroundColor?: Color | string;
}

export declare class Options {
    color_ratio?: number;
    amount?: number;
    opacity?: number;
    spread?: number;
    speed?: number;
    color?: Color;
    backgroundColor?: Color;
    fps?: number;
    useMouse?: boolean;
    useArrowKeys?: boolean;
    showDebug?: boolean;
    constructor(options: OptionsProps);
}
