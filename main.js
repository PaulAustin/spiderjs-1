
import * as surface from './jslib/surface.js'
import * as spider from './jslib/spider.js'
import * as geo from './jslib/geometry.js'

// Add an entry point to the global world.

window.spider = {}
window.spider.newSpider = spider.newSpider

window.spider.testGrid = function () {
  let svg = document.getElementById('spiderSvgCanvas')
  let s = new surface.SVGSurface(svg)
  let sSub = new surface.VirtualCSurface(s)
  geo.createCGrid(sSub, 0, 20, 5, 0, 20, 5)
}

window.spider.square = function () {
  let svg = document.getElementById('spiderSvgCanvas')
  let s = new surface.SVGSurface(svg)
  let octo = new spider.Spider(s)
  octo.home()
  // octo.penColor('aliceBlue')
  // octo.penColor('rgb(255,0,0)')
  // octo.penColor('rgba(255,0,0,0.5)')
  octo.penRGB(0,255,255)
  octo.penWidth(10.0)
  for (let i = 0; i < 4; i++) {
      octo.forward(100)
      // TODO When colors are partly alpha overlapped,
      // corners get double dipped.
      octo.right(90)
  }
}