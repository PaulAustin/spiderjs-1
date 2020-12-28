
import * as svgb from './jslib/svgbuilder.js'

export function hello (message) {
  console.log('Howdy!', message)
}

// add an entry point to the global world
window.hello = hello;
hello('From JS ES6 code file')
svgb.svgbHello("What's up out there?")
