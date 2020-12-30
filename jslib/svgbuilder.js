/*
Copyright (c) 2016 Paul Austin - SDG

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

export function pmove (v) {
  return 'm' + v.x + ' ' + v.y + ' ';
}
export function phline (dx) {
  return 'h' + dx + ' ';
}
export function pvline (dy) {
  return 'v' + dy + ' ';
}
export function pline (v) {
  return 'l' + v.x + ' ' + v.y + ' ';
}
// arc path element
export function parc (radius, degrees, large, sweep, dx, dy) {
  var text = 'a' + radius + ' ' + radius + ' ' + degrees;
  text += ' ' + large + ' ' + sweep + ' ' + dx + ' ' + dy + ' ';
  return text;
}
// path closing
export function pclose () {
  return 'z';
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
  
  createGroup (x, y) {
    var elt = document.createElementNS(this.ns, 'g');
    // elt.setAttribute('class', elementClass);
    elt.setAttribute('transform', 'translate (' + x + ' ' + y + ')');
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
  
  createPath (lstyle, pathData) {
    var elt = document.createElementNS(this.ns, 'path');
    elt.setAttribute('stroke', lstyle.color);
    elt.setAttribute('stroke-width', lstyle.width);
    elt.setAttribute('d', pathData);
    return elt;
  }
}
