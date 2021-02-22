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
export class Surface {
  constructor () {
    this.setExtent(100, 100)
    this.linear = true
  }

  setExtent (width, height) {
    this.w = width;
    this.h = height;
    this.xOffset = this.w / 2
    this.yOffset = this.h / 2
  }
  // Consider full transform, its over kill, but woudl be helpful to
  // to show what the underlying pipeline does.
  scaleX (x) {
    return x
  }
  scaleY (y) {
    return -y
  }
  mapX (x) { 
    return this.scaleX(x) + this.xOffset
  } 
  mapY (y) {
    return this.scaleY(y) + this.yOffset
  }
}

export class VirtualCSurface extends Surface {  
  // For SVG if this is done via the transform element then
  // then live updates can be simpler. This only covers
  // linear mappings ( including rotation) but not transition to polar
  // spherical etc. 

  constructor (root) {
    super()
    this.root = root
    this.setExtent (root.width, root.height)
  }
  scaleX (x) {
    return this.root.scaleX(x)
  }
  scaleY (y) {
    return this.root.scaleY(y)
  }
  mapX (x) { 
    return this.root.mapX(x)
  } 
  mapY (y) {
    return this.root.mapY(y)
  }
  pmove (v) {
    return this.root.pmove(v)
  }
  pamove (v) {
    return this.root.pamove(v)
  }
  phline (distance) {
    return this.root.phline(distance)
  }
  pvline (distance) {
    return this.root.pvline(distance)
  }
  pline (v) {
    return this.root.pline(v)
  }
  paline (v) {
    return this.root.paline(v)
  }
  pclose () {
    return this.root.pclose()
  }  
  createPath (lstyle, pathData) {
    return this.root.createPath(lstyle, pathData)
  }
  append (elt) {
    return this.root.append(elt)
  }
}

export class VirtualPSurface extends Surface {  
  // For SVG if this is done via the transform element then
  // then live updates can be simpler. This only covers
  // linear mappings ( including rotation) but not transition to polar
  // spherical etc. 

  constructor (root) {
    super()
    this.root = root
  }
  scaleX (x) {
    return super.scaleX(x)
  }
  scaleY (y) {
    return super.scaleY(y)
  }
  mapX (x) { 
    return super.mapX(this.scaleX(x) + this.xOffset)
  } 
  mapY (y) {
    return super.mapY(this.scaleY(y) + this.yOffset)
  }
  pmove (v) {
    return this.root.pmove(v)
  }
  pamove (v) {
    return this.root.pamove(v)
  }
  phline (distance) {
    return this.root.phline(distance)
  }
  pvline (distance) {
    return this.root.pvline(distance)
  }
  pline (v) {
    return this.root.pline(v)
  }
  paline (v) {
    return this.root.paline(v)
  }
  pclose () {
    return this.root.pclose()
  }  
  createPath (lstyle, pathData) {
    return this.root.createPath(lstyle, pathData)
  }
  append (elt) {
    return this.root.append(elt)
  }
}

export class BitmapSurface extends Surface {  
}

export class SVGSurface extends Surface {
  constructor (svg) {
    super()
    this.svg = svg
//  this.xlinkns = 'http://www.w3.org/1999/xlink';
    this.ns = 'http://www.w3.org/2000/svg'
    this.group = this.createGroup(0, 0)
  }
  pmove (v) {
    return 'm' + this.mapX(v[0]) + ' ' + this.mapY(v[1]) + ' ';
  }
  pamove (v) {
    return 'M' + this.mapX(v[0]) + ' ' + this.mapY(v[1]) + ' ';
  }
  phline (distance) {
    return 'h' + distance + ' '
  }
  pvline (distance) {
    return 'v' + distance + ' '
  }
  pline (v) {
    return 'l' + this.scaleX(v[0]) + ' ' + this.scaleY(v[1]) + ' '
  }
  paline (v) {
    return 'L' + this.mapX(v[0]) + ' ' + this.mapY(v[1]) + ' '
  }
  // arc path element
  parc (radius, degrees, large, sweep, dx, dy) {
    var text = 'a' + radius + ' ' + radius + ' ' + degrees
    text += ' ' + large + ' ' + sweep + ' ' + dx + ' ' + dy + ' '
    return text
  }
  // path closing
  pclose () {
    return 'z'
  }  

  createSquare (lstyle, pathData) {
    var elt = document.createElementNS(this.ns, 'rectangle');
    elt.setAttribute('stroke', lstyle.color);
    elt.setAttribute('stroke-width', lstyle.width);
    // paths look at linejoin not linecap
    elt.setAttribute('stroke-linejoin', 'round');
    elt.setAttribute('d', pathData);
    return elt;
  }

  createPath (lstyle, pathData) {
    var elt = document.createElementNS(this.ns, 'path');
    elt.setAttribute('stroke', lstyle.color);
    elt.setAttribute('stroke-width', lstyle.width);
    // paths look at linejoin not linecap
    elt.setAttribute('stroke-linejoin', 'round');
    elt.setAttribute('d', pathData);
    return elt;
  }

  createGroup (x, y) {
    let group = document.createElementNS(this.ns, 'g');
    group.setAttribute('transform', 'translate (' + x + ' ' + y + ')');
    this.svg.appendChild(group);
    return group;
  }
  
  append (elt) {
    this.group.appendChild(elt);
  }
}

export class SVGBuilder {
  constructor () {
    this.xlinkns = 'http://www.w3.org/1999/xlink';
    this.ns = 'http://www.w3.org/2000/svg';
  }

  createSymbolUse (elementClass, symbolName) {
    var elt = document.createElementNS(this.ns, 'use');
    elt.setAttribute('class', elementClass);
    elt.setAttributeNS(this.xlinkns, 'xlink:href', symbolName);
    return elt;
  }
    
  resizeRect (elt, w, h) {
    elt.setAttribute('width', String(w) + 'px');
    elt.setAttribute('height', String(h) + 'px');
  }
  
  translateXY (elt, x, y) {
    elt.setAttribute('transform', 'translate (' + String(x) + ' ' + String(y) + ')');
  }
  
  createRect (elementClass, x, y, w, h, rxy) {
    var elt = document.createElementNS(this.ns, 'rect');
    elt.setAttribute('class', elementClass);
    elt.setAttribute('x', x);
    elt.setAttribute('y', y);
    this.resizeRect(elt, w, h);
    if (rxy !== undefined) {
      elt.setAttribute('rx', rxy);
      elt.setAttribute('ry', rxy);
    }
    return elt;
  }
  
  creatCircle (cx, cy, r) {
    var elt = document.createElementNS(this.ns, 'circle');
    // elt.setAttribute('class', elementClass);
    elt.setAttribute('cx', cx);
    elt.setAttribute('cy', cy);
    elt.setAttribute('r', r);
    return elt;
  }
    
  createText (x, y, text) {
    var elt = document.createElementNS(this.ns, 'text');
    // elt.setAttribute('class', elementClass);
    elt.setAttribute('x', x);
    elt.setAttribute('y', y);
    elt.textContent = text;
    return elt;
  }  
}
