export declare class CanvasContainer {
    container: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    constructor(container: HTMLCanvasElement);
    resize(): void;
}
