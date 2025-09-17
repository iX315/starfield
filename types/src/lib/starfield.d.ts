import { StarFactory } from './starFactory';
import { HyperspaceStates } from './hyperspace';
import { Options } from './options';
import { CanvasContainer } from './canvasContainer';
import { Coords } from './coordinates';
export declare class Starfield {
    canvas: CanvasContainer;
    starfactory?: StarFactory;
    hyperspace: HyperspaceStates;
    options: Options;
    currentPos: Coords;
    cursorPos: Coords;
    _temp_settings: any;
    key: any;
    loop: any;
    constructor(container: HTMLCanvasElement, options?: Partial<Options>);
    start(): this;
    stop(): void;
    addListeners(): void;
    removeListeners(): void;
    key_manager(event: KeyboardEvent): void;
    use_arrows(key: string): void;
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
