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

// This is written a bit more like it was done in C or C++
// Stings in JavaScript are UFT16 which throws a bit loop. Espicially since 
// It woudl be nice to support emojis which are beyond the basic multilingual plane
// (BMP) so there will be many surrogate pairs.
// Ths core part of the parse is to build a expression tree that points into
// UTF16 character positions in the original codeText

function isNum (cCode) {
  return (cCode >= 48 && cCode < 58)
}

function isAlphaNum (cCode) {
  // Possible ASCII code, need to checek for UTF8 escape
  // most non ASCII unicode characters will be considered alpha-num
  // Not this does not account for numeric prefixes etc.
  return (cCode >= 65 && cCode < 91) || (cCode >= 97 && cCode < 123)
}

export class Tokenizer {
  constructor () {
    this.ct = ''
    this.pos = 0
    this.end = 0
  }

  parse (codeText) {
    this.ct = codeText
    this.pos = 0
    this.end = this.ct.length
    while (this.pos < this.end) {
      this.skipSpaces()
      this.readToken()
    }
  }

  checkForComment () {
    // TODO skip to endo-of-line comments
    // or block comments
  }

  readToken () {
    let begin = this.pos
    let c = this.ct.charAt(this.pos)
    let cCode = this.ct.charCodeAt(this.pos)
    if (isNum(cCode)) {
      this.readNumber()
    } else if (isAlphaNum(cCode)) {
      this.readSymbol()
    } else if (c === '(' || c === ')') {
      this.pos += 1
    } else {
      // nothing found ??
    }
    this.printRange(begin, this.pos)
  }

  // pos should be at fist numeric character
  readNumber () {
    // There are differnt number formats 
    // TODO now it only handles simple integers.
    // let begin = this.pos
    while (this.pos < this.end) {
      let cCode = this.ct.charCodeAt(this.pos)
      if (isNum(cCode)) {
        this.pos += 1
      } else {
        break;
      }
    }
  }

  // pos should be at fist alpha character
  readSymbol () {
    // There are differnt number formats 
    // TODO now it only handles alphanum, no emoji.
    // let begin = this.pos
    while (this.pos < this.end) {
      let cCode = this.ct.charCodeAt(this.pos)
      if (isAlphaNum(cCode)) {
        this.pos += 1
      } else {
        break;
      }
    }
  }

  printRange (begin, end) {
    let token = this.ct.substring(begin, end)
    console.log('token', begin, end, '->', token)
  }

  skipSpaces () {
    while (this.pos < this.end) {
      let c = this.ct.charAt(this.pos)
      if (c === ' ' || c === '\t' || c === '\n') {
        this.pos += 1
      } else if (c === '/' && this.checkForComment()) {
        this.pos += 1
        // Skip the commnent
      } else {
        break
      }
    }
  }
}
