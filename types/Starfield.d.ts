import { StarFactory } from './StarFactory';
import { HyperspaceStates } from './Hyperspace';
import { Options } from './Options';
import { CanvasContainer } from './CanvasContainer';
export declare class Coords {
    x: number;
    y: number;
    z?: number;
}
export declare class Starfield {
    container: CanvasContainer;
    starfactory: StarFactory;
    hyperspace: HyperspaceStates;
    options: Options;
    currentPos: Coords;
    cursorPos: Coords;
    _temp_settings: any;
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
    createStarFactory(): void;
    resize(): void;
    debug(): void;
    update(): void;
    tick(): void;
    hyperspaceTick(): void;
    get_screen_size(): {
        w: number;
        h: number;
    };
    maxZ(): number;
}
