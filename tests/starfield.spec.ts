import { Starfield } from '../src/lib/starfield'

describe('Starfield', () => {
  beforeAll(() => {
    const canvasTag = '<canvas id="starfield_container"></canvas>'
    document.body.insertAdjacentHTML('afterbegin', canvasTag)
  })

  afterAll(() => {
    const canvas = document.getElementById('starfield_container')
    if (canvas) {
      canvas.remove()
    }
  })

  it('should create starfield instance with valid canvas', () => {
    const canvas = document.getElementById('starfield_container') as HTMLCanvasElement
    const starfield = new Starfield(canvas).start()

    expect(canvas.id).toBe(starfield.canvas.container.id)
    expect(starfield.options.amount).toBe(2000)
    expect(starfield.options.speed).toBe(2)
  })

  it('should throw error when canvas is null', () => {
    expect(() => {
      new Starfield(null as unknown as HTMLCanvasElement)
    }).toThrow('Container not set')
  })

  it('should accept custom options', () => {
    const canvas = document.getElementById('starfield_container') as HTMLCanvasElement
    const starfield = new Starfield(canvas, {
      amount: 1000,
      speed: 5,
      useMouse: true
    })

    expect(starfield.options.amount).toBe(1000)
    expect(starfield.options.speed).toBe(5)
    expect(starfield.options.useMouse).toBe(true)
  })

  it('should handle color changes', () => {
    const canvas = document.getElementById('starfield_container') as HTMLCanvasElement
    const starfield = new Starfield(canvas)

    starfield.changeColor('#ff0000')
    expect(starfield.options.color.hex()).toBe('#ff0000')
  })

  it('should start and stop animation', () => {
    const canvas = document.getElementById('starfield_container') as HTMLCanvasElement
    const starfield = new Starfield(canvas)

    starfield.start()
    expect(starfield.loop).not.toBeNull()

    starfield.stop()
    expect(starfield.loop).toBeNull()
  })

  it('should handle resize', () => {
    const canvas = document.getElementById('starfield_container') as HTMLCanvasElement
    const starfield = new Starfield(canvas)

    // Mock resize
    const originalWidth = starfield.canvas.width
    canvas.style.width = '200px'
    canvas.style.height = '200px'
    
    starfield.resize()
    expect(starfield.canvas.width).toBeGreaterThan(0)
    expect(starfield.canvas.height).toBeGreaterThan(0)
  })
})
