import { Starfield } from './Starfield';

console.log('See this in your browser console: Typescript Webpack Starter Launched');

const container = <HTMLCanvasElement> document.getElementById('starfield_container')

const starfield = new Starfield(container);
starfield.start()

window['starfield'] = starfield