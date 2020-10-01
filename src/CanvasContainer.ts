export class CanvasContainer {
    context: CanvasRenderingContext2D
    width: number
    height: number

    constructor(container: HTMLCanvasElement) {
        this.context = container.getContext('2d')
        this.width = container.getBoundingClientRect().width
        this.height = container.getBoundingClientRect().height
        container.width = container.getBoundingClientRect().width
        container.height = container.getBoundingClientRect().height
    }
}