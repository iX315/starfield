import Stars from './Stars';
import Color from 'color';
declare enum HyperspaceStates {
    Off = 0,
    Entering = 1,
    Running = 2,
    Exiting = 3
}
export declare class Starfield {
    flag: boolean;
    test: boolean;
    amount: number;
    w: number;
    h: number;
    currentX: number;
    currentY: number;
    z: number;
    stars: Stars;
    color_ratio: number;
    opacity: number;
    spread: number;
    speed: number;
    color: Color;
    backgroundColor: Color;
    hyperspace: HyperspaceStates;
    _temp: any;
    cursorX: number;
    cursorY: number;
    changedX: number;
    changedY: number;
    context: CanvasRenderingContext2D;
    key: any;
    loop: any;
    fps: number;
    constructor(container: HTMLCanvasElement);
    start(): void;
    listeners(): void;
    key_manager(event: KeyboardEvent): void;
    mouse_manager(event: MouseEvent): void;
    changeColor(colorValue: any): void;
    changeAmount(amountValue: number): void;
    resize(): void;
    update(): void;
    tick(): void;
    hyperspaceTick(): void;
    get_screen_size(): {
        w: number;
        h: number;
    };
}
export default Starfield;
