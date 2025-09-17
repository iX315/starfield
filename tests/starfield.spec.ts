import { Starfield } from '../src/lib/starfield'

describe('Starfield', async () => {
  beforeAll(function () {
    const canvasTag = '<canvas id="starfield_container"></canvas>'
    document.body.insertAdjacentHTML('afterbegin', canvasTag)
  })

  it('yop it works 👌🏽', async () => {
    const canvas = <HTMLCanvasElement>document.getElementById('starfield_container')
    const starfield = new Starfield(canvas).start()

    expect(canvas.id).toBe(starfield.canvas.container.id)
  })
})
