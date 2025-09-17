import { CanvasContainer } from './canvasContainer';
import { Coords } from './starfield';
export interface MoveParams {
    container: CanvasContainer;
    changeRate: Coords;
    currentPos: Coords;
    speed: number;
    spread: number;
    color_ratio: number;
    maxZ: number;
}
interface StarProps extends Coords {
    from?: number;
    to?: number;
}
export declare class Star {
    x: number;
    y: number;
    z: number;
    from?: number;
    to?: number;
    out_of_view: boolean;
    constructor(props: StarProps);
    move({ container, changeRate, currentPos, speed, spread, color_ratio, maxZ }: MoveParams): void;
    moveX(rate: number, current: number, width: number): void;
    moveY(rate: number, current: number, height: number): void;
    moveZ(speed: number, current: number): void;
}
export {};
