import Color from 'color'

import {StarFactory} from './StarFactory'
import {HyperspaceStates} from './Hyperspace'
import {Options} from './Options'
import {CanvasContainer} from './CanvasContainer'

import type {OptionsProps} from './Options'

export class Coords {
  x: number
  y: number
  z?: number
}

export class Starfield {
  container: CanvasContainer
  starfactory: StarFactory
  hyperspace: HyperspaceStates = HyperspaceStates.Off
  options: Options

  currentPos: Coords
  cursorPos: Coords

  _temp_settings: any

  key: any
  loop: any

  public constructor(container: HTMLCanvasElement, options?: OptionsProps) {
    this.setOptions(options)

    // starfield container (canvas)
    if (!container) {
      throw new Error('Container not set')
    }

    this.container = new CanvasContainer(container)
    this.resize()

    this.changeAmount(this.options.amount)
  }

  public start() {
    this.resize()
    this.loop = setInterval(() => this.tick(), this.options.fps)
    this.addListeners()
  }

  public stop() {
    clearTimeout(this.loop)
    this.removeListeners()
  }

  public setOptions(options: OptionsProps) {
    this.options = new Options(options)
  }

  addListeners() {
    window.addEventListener('resize', () => this.resize())
    document.addEventListener('keyup', (e) => this.key_manager(e))
    document.addEventListener('mousemove', (e) => this.mouse_manager(e))
  }

  removeListeners() {
    window.removeEventListener('resize', () => this.resize())
    document.removeEventListener('keyup', (e) => this.key_manager(e))
    document.removeEventListener('mousemove', (e) => this.mouse_manager(e))
  }

  key_manager(event: KeyboardEvent) {
    let key = event.which || event.keyCode
    console.log(key)
    switch (key) {
      case 27:
        // esc - when the loop is not set start the animation
        !this.loop ? this.start() : this.stop()
        break
      case 32:
        // spacebar
        if (this.hyperspace == HyperspaceStates.Off) {
          this.hyperspace = HyperspaceStates.Entering
        }
        if (this.hyperspace == HyperspaceStates.Running) {
          this.hyperspace = HyperspaceStates.Exiting
        }
        break
    }
    if (this.options.useArrowKeys) {
      this.use_arrows(key)
    }
    top.status = 'key=' + ((key < 100) ? '0' : '') + ((key < 10) ? '0' : '') + key
  }

  use_arrows(key: number) {
    switch (key) {
      case 38:
        // arrow up
        break
    }
  }

  mouse_manager(event: MouseEvent) {
    if (!this.options.useMouse) return
    this.cursorPos.x = event.clientX
    this.cursorPos.y = event.clientY
  }

  changeColor(colorValue: any) {
    this.options.color = Color(colorValue)
  }

  changeAmount(amountValue: number) {
    this.options.amount = amountValue
    this.createStarFactory()
  }

  createStarFactory() {
    this.starfactory = new StarFactory({
      count: this.options.amount,
      width: this.container.width,
      height: this.container.height,
      x: this.currentPos.x,
      y: this.currentPos.y,
      z: this.maxZ(),
    })
  }

  resize() {
    this.currentPos = {
      x: Math.round(this.container.width / 2),
      y: Math.round(this.container.height / 2),
    }
    this.cursorPos = this.currentPos
    this.container.resize()
    this.createStarFactory()
  }

  debug() {
    this.container.context.font = '12px Arial'
    this.container.context.fillStyle = 'white'

    this.container.context.fillText('speed: '+this.options.speed, 0, this.container.height - (12*3))
    this.container.context.fillText('maxZ: '+this.maxZ(), 0, this.container.height - (12*2))
    this.container.context.fillText('star[0]: '+JSON.stringify(this.starfactory.store[0]), 0, this.container.height - (12*1))
  }

  update() {
    //context.lineCap='round'
    this.container.context.fillStyle = this.options.backgroundColor.alpha(this.options.opacity).toString()
    this.container.context.strokeStyle = this.options.color.toString() // Star's color
    this.container.context.fillRect(0, 0, this.container.width, this.container.height)
    this.options.showDebug ? this.debug() : null
  }

  tick() {
    this.hyperspaceTick()

    this.update()

    this.starfactory.move({
      container: this.container,
      changeRate: {
        x: -(this.cursorPos.x - this.currentPos.x) / 2,
        y: -(this.cursorPos.y - this.currentPos.y) / 2,
      },
      currentPos: this.currentPos,
      speed: this.options.speed,
      spread: this.options.spread,
      color_ratio: this.options.color_ratio,
      maxZ: this.maxZ(),
    })
  }

  hyperspaceTick() {
    if (this.hyperspace == HyperspaceStates.Entering) {
      // save the current settings...
      if (!this._temp_settings) {
        this._temp_settings = {
          speed: this.options.speed,
          spread: this.options.spread,
          backgroundColor: Color(this.container.context.fillStyle),
        }
      }

      this.options.speed = this.options.speed * 1.025
      this.options.spread = this.options.spread * 0.99
      var c = Math.round(this.options.speed * 2.5) + 32
      this.container.context.fillStyle = Color.rgb(c, c, c).toString()
      if (this.options.speed > 112) {
        this.container.context.fillStyle = Color.rgb(43, 45, 53).toString()
        this.options.speed = 16
        this.options.spread = 256
        this.hyperspace = HyperspaceStates.Running
      }
    }
    if (this.hyperspace == HyperspaceStates.Exiting) {
      this.options.speed = this.options.speed / 1.025
      this.options.spread = this.options.spread * 0.99
      var c = Math.round(this.options.speed / 2.5) - 32
      this.container.context.fillStyle = Color.rgb(c, c, c).toString()
      if (this.options.speed < this._temp_settings.speed) {
        this.container.context.fillStyle = this._temp_settings.backgroundColor.toString()
        this.options.speed = this._temp_settings.speed
        this.options.spread = this._temp_settings.spread
        this.hyperspace = HyperspaceStates.Off
        this._temp_settings = false
      }
    }
  }

  get_screen_size() {
    var w = document.documentElement.clientWidth
    var h = document.documentElement.clientHeight
    return {w, h}
  }

  maxZ() {
    let {width, height} = this.container
    return (width + height) /2
  }
}
