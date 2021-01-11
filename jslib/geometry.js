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

// Geometry is for drawing lines, surfaces, volumes and graphs.

import * as spider from './spider.js'

function * linearRange (v, dv, n) { // a generator function
  let val = v;
  let end = v + (dv * n)
  while (val < end) {
    let current = val;
    val = val + dv;
    yield current;
  }
}

// Ininital drawing functions
export function createCGrid (s, x, dx, nx, y, dy, ny) {
  let octo = new spider.Spider(s)
  octo.penColor('green')
  octo.penWidth(2.5)
  let w = dx * (nx - 1)
  let h = dy * (ny - 1)
  for (const px of linearRange(x, dx, nx)) {
    octo.goto(px, y)
    octo.lineto(px, h)
  }
  for (const py of linearRange(y, dy, ny)) {
    octo.goto(x, py)
    octo.lineto(w, py)
  }
}

export function createPGrid (s, d, dx, a, da) {
}
