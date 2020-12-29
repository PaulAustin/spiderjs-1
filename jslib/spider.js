
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
    this.heading = 0
    this.p = new vector.V2D();
    this.s = new svgb.SVGBuilder();
    this.svg = document.getElementById('spiderSvgCanvas')
  }

  forward (distance) {
    console.log('forward', distance)
    // Add a new node in the path
    // or at least make a dot. Much more to do here.
    let elt = this.s.creatCircle(null, this.p.x, this.p.y, 100)

    // this.background = svgb.createRect('editor-background', 0, 0, 20, 20, 0);
    this.svg.append(elt);
    // this.configInteractions();
  }
  
  backward (distance) {
    console.log('backward', distance)
  }
  
  right (angle) {
    this.heading -= angle
    console.log('backward', this.heading)
  }
  
  left (angle) {
    this.heading += angle
    console.log('left', this.heading)
  }

  goto (x, y) {
    console.log('goto', x, y)
    this.p.set(0, 0)
  }

  setx (x) {}
  set (y) {}
  home () { this.goto(0, 0) }
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
  pendown () {}
  penup () {}
  penwidth (width) {}
  pencolor () {}

  reset () {} // clear + home
  clear () {}
}

export class web {
  spin () {}
}

export class link {

}

export class animations {

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
