import Stars from './Stars'
import Color from 'color';

enum HyperspaceStates {
    Off,
    Entering,
    Running,
    Exiting
}

export class Starfield {
    flag = true;
    test = true;
    amount = 2000;
    w = 0;
    h = 0;
    currentX = 0;
    currentY = 0;
    z = 0;

    stars: Stars
    color_ratio = 5;
    
    opacity = 0.8;
    spread = 256;
    speed = 2;
    color: Color = Color.rgb(241, 231, 192 )
    backgroundColor: Color = Color.rgb(32,35,45)

    hyperspace: HyperspaceStates = HyperspaceStates.Off;
    _temp: any;

    cursorX = 0;
    cursorY = 0;
    changedX = 0;
    changedY = 0;

    context: CanvasRenderingContext2D;

    key: any;

    loop: any;
    fps = 0;

    public constructor (container: HTMLCanvasElement) {
        // starfield container (canvas)

        this.context = container.getContext('2d')
        this.resize()
        container.width = this.w
        container.height = this.h

        this.changeAmount(this.amount)
    }

    public start() {
        this.resize();
        this.loop = setInterval(() => this.tick(), this.fps);
        this.listeners()
    }

    listeners() {
        document.addEventListener('keyup', e => this.key_manager(e))
        document.addEventListener('mousemove', e => this.mouse_manager(e))
    }

    key_manager(event: KeyboardEvent) {
        let key = event.which || event.keyCode;
        console.log(key)
        switch (key) {
            case 27:
                // esc
                this.flag = this.flag ? false : true;
                if (this.flag) {
                    this.start()
                } else {
                    // stop
                    clearTimeout(this.loop);
                }
                break;
            case 32:
                // spacebar
                if (this.hyperspace == HyperspaceStates.Off) {
                    this.hyperspace = HyperspaceStates.Entering
                }
                if (this.hyperspace == HyperspaceStates.Running) {
                    this.hyperspace = HyperspaceStates.Exiting
                }
                break;
            case 38:
                // arrow up
                break;
        }
        top.status = 'key=' + ((key < 100) ? '0' : '') + ((key < 10) ? '0' : '') + key;
    }

    mouse_manager(event: MouseEvent) {
        this.cursorX = event.clientX
        this.cursorY = event.clientY
    }

    changeColor(colorValue: any) {
        this.color = Color(colorValue)
    }

    changeAmount(amountValue: number) {
        this.amount = amountValue
        this.stars = new Stars(this.amount, this.w, this.h, this.currentX, this.currentY, this.z)
    }

    resize () {
        this.w = this.get_screen_size().w;
        this.h = this.get_screen_size().h;
        this.currentX = Math.round(this.w / 2);
        this.currentY = Math.round(this.w / 2);
        this.z = (this.w + this.h) / 2;
        this.color_ratio = 1 / this.z;
        this.cursorX = this.currentX;
        this.cursorY = this.currentY;
    }

    update() {
        //context.lineCap='round';
        this.context.fillStyle = this.backgroundColor.alpha(this.opacity).toString()
        this.context.strokeStyle = this.color.toString(); // Star's color
    }

    tick () {
        this.update()
        this.changedX = -(this.cursorX - this.currentX) / 2
        this.changedY = -(this.cursorY - this.currentY) / 2

        this.hyperspaceTick()
        
        this.context.fillRect(0, 0, this.w, this.h);

        for (var i = 0; i < this.amount; i++) {
            let _star = this.stars.store[i]

            this.test = true;
            this.stars.x_save = _star.from;
            this.stars.y_save = _star.to;
            _star.x += this.changedX >> 4;
            if (_star.x > this.currentX << 1) {
                _star.x -= this.w << 1;
                this.test = false;
            }
            if (_star.x < -this.currentX << 1) {
                _star.x += this.w << 1;
                this.test = false;
            }
            _star.y += this.changedY >> 4;
            if (_star.y > this.currentY << 1) {
                _star.y -= this.h << 1;
                this.test = false;
            }
            if (_star.y < -this.currentY << 1) {
                _star.y += this.h << 1;
                this.test = false;
            }
            _star.z -= this.speed;
            if (_star.z > this.z) {
                _star.z -= this.z;
                this.test = false;
            }
            if (_star.z < 0) {
                _star.z += this.z;
                this.test = false;
            }
            _star.from = this.currentX + (_star.x / _star.z) * this.spread;
            _star.to = this.currentY + (_star.y / _star.z) * this.spread;
            if (this.stars.x_save > 0 && this.stars.x_save < this.w && this.stars.y_save > 0 && this.stars.y_save < this.h && this.test) {
                this.context.lineWidth = (1 - this.color_ratio * _star.z) * 2;
                this.context.beginPath();
                this.context.moveTo(this.stars.x_save, this.stars.y_save);
                this.context.lineTo(_star.from, _star.to);
                this.context.stroke();
                this.context.closePath();
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
                    backgroundColor: Color(this.context.fillStyle)
                }
            }

            this.speed = this.speed * 1.025;
            this.spread = this.spread * 0.99;
            var c = Math.round(this.speed * 2.5) + 32;
            this.context.fillStyle = Color.rgb(c, c, c).toString();
            if (this.speed > 112) {
                this.context.fillStyle = Color.rgb(43,45,53).toString()
                this.speed = 16;
                this.spread = 256;
                this.hyperspace = HyperspaceStates.Running;
            }
        }
        if (this.hyperspace == HyperspaceStates.Exiting) {
            this.speed = this.speed / 1.025;
            this.spread = this.spread * 0.99;
            var c = Math.round(this.speed / 2.5) - 32;
            this.context.fillStyle = Color.rgb(c, c, c).toString();
            if (this.speed < this._temp.speed) {
                this.context.fillStyle = this._temp.backgroundColor.toString()
                this.speed = this._temp.speed;
                this.spread = this._temp.spread;
                this.hyperspace = HyperspaceStates.Off;
                this._temp = false
            }
        }
    }

    get_screen_size () {
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        return { w, h };
    }
}

export default Starfield;
