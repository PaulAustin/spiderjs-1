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
  An ExSystem is a code eco system. Ti is passed codeText to load. 
  it has exterend symoble table for functions that can be querried, or communicated with
  from out side the exec systems. Each Exec System should be instaceable
  excution heart beast shoduel ideally be drive from the outside (??) but os based asyc opeartion
  may prevent this. so perhasp runing interanl is OK as well. 
*/

import * as tk from './tokkenizer.js'

export class LispEx {
  constructor (name) {
    this.name = name
    this.kt = new tk.Tokenizer()
  }

  repl (codeText) {
    tk.parse(codeText)
    let expr = null
    return this.eval(expr)
  }
  
  eval (expr) {
    // CAR CDR CONS DEFINE LAMBDA oh what fun lies ahead
    return expr
  }

  exec () {
    return 0
  }
}
