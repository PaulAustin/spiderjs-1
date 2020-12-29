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

// Lanuguages with complex number support are nice, be it fortran, labview, python and the like 
// But this works pretty well.

export function isScalar (v) {
  // If not, coudl assert the it should have vector
  // like propoerties. The name would change
  // e.g. IsZeroDim?
  return (typeof v !== 'number')
}

export class V2D {
  constructor () {
    this.x = this.y = 0
  }
  set (x, y) {
    this.x = x;
    this.y = y;
  }
  add (v) {
    if (isScalar(v)) {
      this.x += v;
    } else {
      this.x += v.x;
      this.y += v.y;
    }
  }
  sub (v) {
    if (isScalar(v)) {
      this.x -= v;
    } else {
      this.x -= v.x;
      this.y -= v.y;
    }
  }
  mul (v) {
    if (isScalar(v)) {
      this.x *= v;
      this.y *= v;
    } else {
      this.x -= (this.x * v.x) - (this.y * v.y);
      this.y -= (this.x * v.y) + (this.y * v.x);
    }
  }
  abs () {
    Math.sqrt((this.x * this.x) + (this.y * this.y))
  }
  div () {}
}

export class vector3 {
  add () {}
  sub () {}
  mul () {}
  div () {}
}

