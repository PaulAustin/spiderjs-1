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
  let val = 0;
  let dv = 1;
  let n = args[0]
  if (args.length === 3) {
    val = args[0];
    dv = args[1];
    n = args[2];   
  } else if (args.length === 2) {
    val = args[0];
    n = args[2];   
  } else if (args.length === 1) {
    n = args[0]
  } else {
    console.log('unsupported intRange')
  }
  let end = val + (dv * n)
  while (val < end) {
    let current = val;
    val += dv;
    yield current;
  }
}
