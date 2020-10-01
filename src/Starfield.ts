import { StarFactory } from './StarFactory'
import Color from 'color'
import { HyperspaceStates } from './Hyperspace'
import { Options, DefaultOptions } from './Options'
import { CanvasContainer } from './CanvasContainer'

export class Starfield extends Options {
    stars: StarFactory
    hyperspace: HyperspaceStates = HyperspaceStates.Off

    currentX = 0
    currentY = 0
    cursorX = 0
    cursorY = 0
    changedX = 0
    changedY = 0
    z = 0

    test = true
    _temp: any
    container: CanvasContainer

    key: any
    loop: any

    public constructor(container: HTMLCanvasElement, options: Options = DefaultOptions) {
        super()
        this.amount = options.amount
        this.color_ratio = options.color_ratio
        this.opacity = options.opacity
        this.spread = options.spread
        this.speed = options.speed
        this.color = options.color
        this.backgroundColor = options.backgroundColor
        this.fps = options.fps
        this.useMouse = options.useMouse
        this.useArrowKeys = options.useArrowKeys

        // starfield container (canvas)
        if (!container) {
            throw new Error("Container not set")
        }

        this.container = new CanvasContainer(container)
        this.resize()

        this.changeAmount(this.amount)
    }

    public start() {
        this.resize()
        this.loop = setInterval(() => this.tick(), this.fps)
        this.addListeners()
    }

    public stop() {
        clearTimeout(this.loop)
        this.removeListeners()
    }


    addListeners() {
        document.addEventListener('keyup', (e) => this.key_manager(e))
        document.addEventListener('mousemove', (e) => this.mouse_manager(e))
    }

    removeListeners() {
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
        if (this.useArrowKeys) {
            this.use_arrows(key)
        }
        top.status = 'key=' + ((key < 100) ? '0' : '') + ((key < 10) ? '0' : '') + key;
    }

    use_arrows(key: number) {
        switch (key) {
            case 38:
                // arrow up
                break
        }
    }

    mouse_manager(event: MouseEvent) {
        if (!this.useMouse) return
        this.cursorX = event.clientX
        this.cursorY = event.clientY
    }

    changeColor(colorValue: any) {
        this.color = Color(colorValue)
    }

    changeAmount(amountValue: number) {
        this.amount = amountValue
        this.stars = new StarFactory(this.amount, this.container.width, this.container.height, this.currentX, this.currentY, this.z)
    }

    resize() {
        // this.w = this.get_screen_size().w
        // this.h = this.get_screen_size().h
        this.currentX = Math.round(this.container.width / 2)
        this.currentY = Math.round(this.container.height / 2)
        this.z = (this.container.width + this.container.height) / 2
        this.color_ratio = 1 / this.z
        this.cursorX = this.currentX
        this.cursorY = this.currentY
    }

    update() {
        //context.lineCap='round'
        this.container.context.fillStyle = this.backgroundColor.alpha(this.opacity).toString()
        this.container.context.strokeStyle = this.color.toString() // Star's color
    }

    tick() {
        this.update()
        this.changedX = -(this.cursorX - this.currentX) / 2
        this.changedY = -(this.cursorY - this.currentY) / 2

        this.hyperspaceTick()
        
        this.container.context.fillRect(0, 0, this.container.width, this.container.height)

        for (var i = 0; i < this.amount; i++) {
            let _star = this.stars.store[i]

            this.test = true
            this.stars.x_save = _star.from
            this.stars.y_save = _star.to
            _star.x += this.changedX >> 4
            if (_star.x > this.currentX << 1) {
                _star.x -= this.container.width << 1
                this.test = false
            }
            if (_star.x < -this.currentX << 1) {
                _star.x += this.container.width << 1
                this.test = false
            }
            _star.y += this.changedY >> 4
            if (_star.y > this.currentY << 1) {
                _star.y -= this.container.height << 1
                this.test = false
            }
            if (_star.y < -this.currentY << 1) {
                _star.y += this.container.height << 1
                this.test = false
            }
            _star.z -= this.speed
            if (_star.z > this.z) {
                _star.z -= this.z
                this.test = false
            }
            if (_star.z < 0) {
                _star.z += this.z
                this.test = false
            }
            _star.from = this.currentX + (_star.x / _star.z) * this.spread
            _star.to = this.currentY + (_star.y / _star.z) * this.spread
            if (this.stars.x_save > 0 && this.stars.x_save < this.container.width && this.stars.y_save > 0 && this.stars.y_save < this.container.height && this.test) {
                this.container.context.lineWidth = (1 - this.color_ratio * _star.z) * 2
                this.container.context.beginPath()
                this.container.context.moveTo(this.stars.x_save, this.stars.y_save)
                this.container.context.lineTo(_star.from, _star.to)
                this.container.context.stroke()
                this.container.context.closePath()
            }
        }
    }

    hyperspaceTick() {
        if (this.hyperspace == HyperspaceStates.Entering) {
            // save the current settings...
            if (!this._temp) {
                this._temp = {
                    speed: this.speed,
                    spread: this.spread,
                    backgroundColor: Color(this.container.context.fillStyle)
                }
            }

            this.speed = this.speed * 1.025
            this.spread = this.spread * 0.99
            var c = Math.round(this.speed * 2.5) + 32
            this.container.context.fillStyle = Color.rgb(c, c, c).toString()
            if (this.speed > 112) {
                this.container.context.fillStyle = Color.rgb(43,45,53).toString()
                this.speed = 16
                this.spread = 256
                this.hyperspace = HyperspaceStates.Running
            }
        }
        if (this.hyperspace == HyperspaceStates.Exiting) {
            this.speed = this.speed / 1.025
            this.spread = this.spread * 0.99
            var c = Math.round(this.speed / 2.5) - 32
            this.container.context.fillStyle = Color.rgb(c, c, c).toString()
            if (this.speed < this._temp.speed) {
                this.container.context.fillStyle = this._temp.backgroundColor.toString()
                this.speed = this._temp.speed
                this.spread = this._temp.spread
                this.hyperspace = HyperspaceStates.Off
                this._temp = false
            }
        }
    }

    get_screen_size() {
        var w = document.documentElement.clientWidth
        var h = document.documentElement.clientHeight
        return { w, h }
    }
}
