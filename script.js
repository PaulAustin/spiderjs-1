
import * as surface from './jslib/surface.js'
import * as spider from './jslib/spider.js'
import * as geo from './jslib/geometry.js'
import * as maths from './jslib/maths.js'

// Add an entry point to the global world.

window.spiderDemo = {}

window.spiderDemo.matrix = function () {
  let svg = document.getElementById('spiderSvgCanvas')
  let s = new surface.SVGSurface(svg)
  let sSub = new surface.VirtualCSurface(s)
  geo.createCGrid(sSub, 0, 20, 5, 0, 20, 5)
}

window.spiderDemo.square = function () {
  let svg = document.getElementById('spiderSvgCanvas')
  let s = new surface.SVGSurface(svg)
  let octo = new spider.Spider(s)
  octo.home()
  // octo.penColor('aliceBlue')
  // octo.penColor('rgb(255,0,0)')
  // octo.penColor('rgba(255,0,0,0.5)')
  octo.penRGB(0, 255, 255)
  octo.penWidth(10.0)
  for (let i = 0; i < 4; i++) {
    octo.forward(100)
    // TODO When colors are partly alpha overlapped,
    // corners get double dipped.
    octo.right(90)
  }
}

export function grid () {
  let svg = document.getElementById('spiderSvgCanvas')
  let octo = spider.newSpider(svg)
  octo.penColor('red')
  for (let i of maths.range(-500, 501, 100)) {
    octo.moveTo([-500, i])
    octo.lineTo([500, i])
  }  
  for (let i of maths.range(-500, 501, 100)) {
    octo.moveTo([i, -500])
    octo.lineTo([i, 500])
  }  
}

export function koch (octo, side_length, order) {
  if (order > 0) {
    for (let turn of [60, -120, 60, 0]) {
      koch(octo, side_length / 3, order - 1)
      octo.right(turn)
    }
  } else {
    octo.forward(side_length)
  }
}

export function koch_edge (octo, side_length, order) {
  if (order > 0) {
    for (let turn of [60, -120, 60, 0]) {
      octo.forward(side_length / 3)
      octo.right(turn)
    }
  } else {
    octo.forward(side_length)
  }
}

window.spiderDemo.spiral = function () {
  let svg = document.getElementById('spiderSvgCanvas')
  let octo = spider.newSpider(svg)
  octo.penColor('fuchsia')
  octo.penWidth(2.5)
  octo.home()
  octo.moveTo([-100, 100])
  for (let i of maths.range(10)) {
    octo.forward(200)
    octo.right(144)
  }

  octo.moveTo([0, 0])
  octo.penColor('green')
  let sg = maths.fgen(Math.sin, 0, 0.05);
  let cg = maths.fgen(Math.cos, 0, 0.05);
  for (let i of maths.range(200)) {
    let x = sg.next().value * 50;
    let y = cg.next().value * 50;
    octo.lineTo([x, y])
  }
  // grid()
  octo.moveTo([-100, 0])

  octo.penColor('blue')
  octo.penWidth(1)
  for (let i of maths.range(3)) {
    koch(octo, 200, 3)
    octo.left(120)
  }
}
