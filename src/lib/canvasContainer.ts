export class CanvasContainer {
  container: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number = 0
  height: number = 0

  constructor(container: HTMLCanvasElement) {
    this.container = container
    const context = container.getContext('2d')
    if (!context) throw Error('2d context cannot be found')
    this.context = context

    this.resize()
  }

  resize() {
    this.width = this.container.getBoundingClientRect().width
    this.height = this.container.getBoundingClientRect().height
    this.container.width = this.container.getBoundingClientRect().width
    this.container.height = this.container.getBoundingClientRect().height
  }
}