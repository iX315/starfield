import Color from 'color';
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
    constructor(options: Partial<Options>);
}
