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

// A bit more pythonic range, random functions

// Positive integer ranges starting from 0
export function * range (...args) { 
  let start = 0
  let stop = 0
  let step = 1
  if (args.length === 3) {
    start = args[0];
    stop = args[1];
    step = args[2];   
  } else if (args.length === 2) {
    start = args[0];
    stop = args[1];
  } else if (args.length === 1) {
    stop = args[0];
  } else {
    console.log('unsupported intRange')
  }
  let val = start
  while (val < stop) {
    let current = val;
    val += step;
    yield current;
  }
}

export function * fgen (f, x0, dx) {
  let x = x0;

  while (true) {
    let current = x
    x += dx;
    yield f(current);
  }
}
