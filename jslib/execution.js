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

/* 
simple form of expression is in the from of JSON stile object
{ instruction: [

]
}
*/

export var sample = { instructions: [
  ['loop', 4,
    ['forward', 100],
    ['right', 90]
  ]
]
}

export class Execution {
  importSymbols (symbols) {}
  runScript (script) {
    this.script = script
    this.instruction = 0
  }
  executeSlice () {
    // read instruciton
    // if core function manage it here (loop, if)
    // else look up functions and call it
    // if function done then? do antoher?
    // if async then continue later.

    let ins = this.script[this.idx]
    if (ins === 'loop') {

    } else {

    }
  }
}
