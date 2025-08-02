import {Starfield} from './Starfield'

export default (() => {
  const container = <HTMLCanvasElement> document.getElementById('starfield_container')
  new Starfield(container, {showDebug: true}).start()
})()