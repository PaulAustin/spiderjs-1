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

import * as tk from './tokenizer.js'

class LBlock {
  constructor () {
    this.car = null
    this.cdr = null
  }
  setCar (car) {
    this.car = car
  }
  setCdr (cdr) {
    this.cdr = cdr
  }
}

class ConsBlock extends LBlock {
  constructor (car, cdr) {
    super()
    this.car = car
    this.cdr = cdr
  }
  print () {
    console.log('cons')
    if (this.car !== null) {
      this.car.print()
    }
    if (this.cdr !== null) {
      this.cdr.print()
    }
  }
}

class Atom extends LBlock {
  constructor (car) {
    super()
    this.car = car
    this.cdr = null
  }
  print () {
    console.log('atom', this.car.token)
  }
}

export class LispEx {
  constructor (name) {
    this.name = name
    this.tokenizer = new tk.Tokenizer()
    this.tkpos = 0
  }

  readToken () {
    if (this.tkpos < this.tokens.length) {
      return this.tokens[this.tkpos++]
    } else {
      return null
    }
  }

  // Recursive list building functon
  readList () {
    // If the list is empty e.g () then there is no cons block
    // just return null (in LISP terms that is nil) 
    let head = null
    let prevcb = null
    let car = null

    let tk = this.readToken()
    while (tk !== null && tk.token !== ')') {
      if (tk.token === '(') {
        // Recurse on a nested list 
        console.log('cons-list', tk)
        car = this.readList()
      } else {
        // Read an atom and have it point to
        // the token as its value
        console.log('cons-atom', tk)
        car = new Atom(tk)
      }
      let cb = new ConsBlock(car, null)
      if (head === null) {
        head = cb
      }
      if (prevcb !== null) {
        prevcb.setCdr(cb)
      }
      prevcb = cb
      tk = this.readToken()
    }
    return head
  }

  repl (codeText) {
    this.tokens = this.tokenizer.parse(codeText)
    console.log(codeText, this.tokens)

    let tk = this.readToken()
    if (tk === null || tk.token !== '(') {
      console.log('Wait?, what? its not a list')
      this.expr = null
    } else {
      this.expr = this.readList(this.tokens)
      this.expr.print()
    }

    return this.eval(this.expr)
  }
  
  print (expr) {
    expr.print()
  }

  eval (expr) {
    // CAR CDR CONS DEFINE LAMBDA oh what fun lies ahead
    return expr
  }

  exec () {
    return 0
  }
}
