/*
Copyright (c) 2021 Paul Austin - SDG

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as vector from './vector.js'
import * as surface from './surface.js'

/*
    var base = app.dots.defineButtons(actionButtonDefs, document.getElementById('editorSvgCanvas'));
    // It seems SVG eat all the events, even ones that don't hit any objects :(
    //actionDots.defineButtons(actionButtonDefs, document.getElementById('actionDotSvgCanvas'));
*/ 
export function newSpider (svg) {
  let s = new surface.SVGSurface(svg);
  return new Spider(s)
}

export class Spider {
  constructor (s) {
    this.lstyle = {color: 'grey', width: 1}
    this.heading = 0
    this.location = [0, 0];
    this.s = s
    // TODO track size of SVG
    this.s.setExtent(400, 400)
    this.path = []
    this.penDepth = 0 
    this.fillActive = false
    this.speed = 0
    this.showSpider()
  }

  // each node represents a set of state changes
  // that will be applied across sapce and time
  // In classic turtle the changes are more discret
  addNode (elt) {
    // This is an ohc to the path nodes holding the actual 
    // cire code fr each behaviour. The spider methods 
    // are wrappers with specific parameters that are 
    // not so data driven.
    let pn = new LineNode(elt)
    this.path.push(pn)
    this.s.append(elt)
  }

  forward (distance) {
    let v = vector.vFromPolar(distance, this.heading)
    let s = this.s
    let path = s.pamove(this.location) + s.pline(v) + s.pclose()
    this.location = vector.add(this.location, v)

    let elt = s.createPath(this.lstyle, path)
    this.addNode(elt)
  }
  
  backward (distance) {
  }
  
  right (angle) {
    // can be animated at slow speeds
    this.heading -= angle
  }
  
  left (angle) {
    this.heading += angle
  }

  lineTo (where) {
    // animate a hop to a new location with shadow?
    let s = this.s
    let path = s.pamove(this.location) + s.paline(where) + s.pclose()
    this.location = where
    let elt = s.createPath(this.lstyle, path)
    this.addNode(elt)
  }

  moveTo (where) {
    // animate a hop to a new location with shadow?
    this.location = [...where]
  }

  beginFill () {
    // add fill color? 
    this.fillActive = true
    // path start, length?
  }
  endFill () {
    this.fillActive = false
    // close and fill.
    // does it build incrementally, fill incramentally
    // the dynamic element seems reaasonable, it grows like a soap bubble? 
  }

  // return list of points
  pathPoints () {}

  setX (x) {
    this.moveTo([x, this.location[1]])
  }

  setY (y) {
    this.moveTo([this.location[0], y])
  }

  setHeading (h) {
    this.heading = h
  }

  home () { 
    this.moveTo([0, 0])
    this.setHeading(0)
  }

  circle () {}

  push () {}
  pop () {}

  // Add path artifacts
  dot () {}
  stamp () {}
  clearstamp () {}
  clearstamps () {}
  undo () {}
  setSpeed (speed) {
    this.speed = speed
  }
  position () {
    return this.location
  }
  towards () {}
  x () {
    return this.location.x
  }
  y () {
    return this.location.y
  }
  distance () {}

  // Pens
  penDown () {
    // stop the recording of pathNodes
    this.penDepth -= 1
  }
  penUp () {
    // stop the recording of pathNodes
    this.penDepth += 1
  }
  penWidth (width) {
    this.lstyle.width = width
  }
  penColor (color) {
    this.lstyle.color = color
  }
  penRGB (r, g, b) {
    this.lstyle.color = 'rgb(' + r + ',' + g + ',' + b + ')'
  }
  reset () {
    this.clear()
    this.home()
  }
  clear () {
    // clear pth list and SVG elements
  }
  showSpider () {
    this.visible = true
  }
  hideSpider () {
    this.visible = false
  }
  isVisible () {
    return this.visible
  }
}

export class web {
  spin () {}
}

export class PathNode {
  constructor (elt) {
    this.elt = elt
  }
}

export class LineNode extends PathNode {
  constructor (elt) { 
    super(elt)
    this.x = 0
  }
}

export class Animations {

}

export function createMatrix (dimensions) {
// create an n-dimensional interactive cellular automaton matirx
// 0d - a singe point
// 1D - a line what shapes, line, h/v cricular
// 2D - a 2d x-y grid ( rectangulare, polar, other)
// 3D - solid
// theatal projection could be handled by sperate maping funitons be 
}

/* 
concepts
as things move along what are good metaphores to follow?
saving stte to revist
push and pop (save, snap, pic) queue

list, tree, graphs, 
matrix

broad cast
visit
*/
