
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
import * as svgb from './svgbuilder.js'

/*
    var base = app.dots.defineButtons(actionButtonDefs, document.getElementById('editorSvgCanvas'));
    // It seesm SVG eat all the events, even ones that don't hit any objects :(
    //actionDots.defineButtons(actionButtonDefs, document.getElementById('actionDotSvgCanvas'));

    // This is pretty Wonky
    app.defaultFiles.setupDefaultPages(false);

    tbe.init(document.getElementById('editorSvgCanvas'), base);
*/ 

export class Spider {
  constructor () {
    console.log('Creating a new spider')
    this.lstyle = {color: 'grey', width: 1}
    this.heading = 0
    this.location = new vector.V2D();
    let svg = document.getElementById('spiderSvgCanvas')
    this.s = new svgb.Surface(svg);
    this.s.setExtent(400, 400)
    this.path = []
    this.penDepth = 0 
    this.pathActive = false
  }

  // each node represents a set of state changes
  // that will be applied across sapce and time
  // In classic turtle the changes are more discret
  addNode (n) {
    // possible changes x, y, heading, color, 
    // transition linear. 
    // This can make a circle or other curve a simple transaction
    // with goto
    this.path.push(n)
  }

  forward (distance) {
    let v = vector.MakePolar(distance, this.heading)
    let s = this.s
    let path = s.pmove(this.location) + s.pline(v) + s.pclose()
    this.location.add(v)

    let elt = s.createPath(this.lstyle, path)
    s.append(elt)
  }
  
  backward (distance) {
  }
  
  right (angle) {
    this.heading -= angle
    let pn = new PathNode()
    this.addNode(pn)
  }
  
  left (angle) {
    this.heading += angle
    let pn = new PathNode()
    this.addNode(pn)
  }

  goto (x, y) {
    this.location.set(0, 0)
    let pn = new PathNode()
    this.addNode(pn)
  }

  beginPath () {
    // add fill color? 
    this.pathActive = true
    // path start, length?
  }
  endPath () {
    this.pathActive = false
    // close and fill.
    // does it build incrementally, fill incramentally
    // the dynamic element seems reaasonable, it grows like a soap bubble? 
  }

  // return list of points
  pathPoints () {}

  setx (x) {}
  set (y) {}
  home () { 
    this.goto(0, 0)
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
  speed () {}
  position () {}
  towards () {}
  xcor () {}
  ycor () {}
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

  reset () {} // clear + home
  clear () {}
}

export class web {
  spin () {}
}

export class PathNode {
  constructor (name) {
    this.name = name
  }
}

export class LineNode extends PathNode {

}

export class Animations {

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
