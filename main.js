
import * as spider from './jslib/spider.js'
import * as geo from './jslib/geometry.js'

// Add an entry point to the global world.

window.spider = {}
window.spider.newSpider = spider.newSpider
window.spider.testGrid = function () {
  let svg = document.getElementById('spiderSvgCanvas')
  geo.createCGrid(svg, 0, 20, 5, 0, 20, 5)
}
