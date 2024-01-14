export class CanvasContainer {
  container: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number

  constructor(container: HTMLCanvasElement) {
    this.container = container
    this.context = container.getContext('2d')

    this.resize()
  }

  resize() {
    this.width = this.container.getBoundingClientRect().width
    this.height = this.container.getBoundingClientRect().height
    this.container.width = this.container.getBoundingClientRect().width
    this.container.height = this.container.getBoundingClientRect().height
  }
}