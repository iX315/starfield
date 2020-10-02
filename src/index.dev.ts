import { Starfield } from './Starfield'

export default (() => {
    const container = <HTMLCanvasElement> document.getElementById('starfield_container')
    const starfield = new Starfield(container, { showDebug: true })
    starfield.start()
})()