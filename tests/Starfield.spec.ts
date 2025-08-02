import {Starfield} from '../src/Starfield'

test('Starfield', async () => {
  beforeAll(function () {
    var canvasTag = '<canvas id="starfield_container"></canvas>'
    document.body.insertAdjacentHTML('afterbegin', canvasTag)
  })

  it('yop it works 👌🏽', () => {
    var canvas = <HTMLCanvasElement>document.getElementById('starfield_container')
    const starfield = new Starfield(canvas).start()
    //need to output something...
    //expect().toBeTruthy();
  })
})
