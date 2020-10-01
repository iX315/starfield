import { StarFactory } from './StarFactory';
import { HyperspaceStates } from 'Hyperspace';
import { Options } from 'Options';
export declare class Starfield extends Options {
    stars: StarFactory;
    hyperspace: HyperspaceStates;
    w: number;
    h: number;
    currentX: number;
    currentY: number;
    cursorX: number;
    cursorY: number;
    changedX: number;
    changedY: number;
    z: number;
    test: boolean;
    _temp: any;
    context: CanvasRenderingContext2D;
    key: any;
    loop: any;
    constructor(container: HTMLCanvasElement, options?: Options);
    start(): void;
    stop(): void;
    addListeners(): void;
    removeListeners(): void;
    key_manager(event: KeyboardEvent): void;
    use_arrows(key: number): void;
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
