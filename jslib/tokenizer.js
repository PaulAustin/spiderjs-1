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

function buildCharSymolsTable () {
  let symbolChar = new Array(128).fill(false)

  // This might move to a bit field of symbol properties
  // but is a clean way to avoid too much ASCII hardcoding.
  symbolChar['#'.charCodeAt(0)] = true 
  symbolChar['$'.charCodeAt(0)] = true 
  symbolChar['_'.charCodeAt(0)] = true 
  symbolChar['`'.charCodeAt(0)] = true 
  
  symbolChar['!'.charCodeAt(0)] = true 
  symbolChar['?'.charCodeAt(0)] = true 
  symbolChar['~'.charCodeAt(0)] = true 
  symbolChar['%'.charCodeAt(0)] = true
  symbolChar['&'.charCodeAt(0)] = true 
  symbolChar['|'.charCodeAt(0)] = true 

  symbolChar['+'.charCodeAt(0)] = true 
  symbolChar['-'.charCodeAt(0)] = true 
  symbolChar['*'.charCodeAt(0)] = true 
  symbolChar['/'.charCodeAt(0)] = true 
  symbolChar['='.charCodeAt(0)] = true 

  symbolChar[','.charCodeAt(0)] = true 
  symbolChar['.'.charCodeAt(0)] = true 
  symbolChar[':'.charCodeAt(0)] = true 
  symbolChar[';'.charCodeAt(0)] = true 

  symbolChar['('.charCodeAt(0)] = true 
  symbolChar[')'.charCodeAt(0)] = true 
  symbolChar['<'.charCodeAt(0)] = true 
  symbolChar['>'.charCodeAt(0)] = true 
  symbolChar['['.charCodeAt(0)] = true 
  symbolChar[']'.charCodeAt(0)] = true 
  symbolChar['{'.charCodeAt(0)] = true 
  symbolChar['}'.charCodeAt(0)] = true 

  return symbolChar
}

export let charSymolsTable = buildCharSymolsTable()

export function isSymbol (cCode) {
  // Only considering ASCII symbols
  if (cCode < 128) {
    return charSymolsTable[cCode]
  } else {
    return false
  }
}

export class Token {
  constructor (token, type, line) {
    // Could store begin,end but for JS this is pretty easy for simple programs 
    this.token = token
    this.type = type
    this.line = line
  }
}

export class Tokenizer {
  constructor () {
    this.ct = ''
    this.pos = 0
    this.end = 0
    this.line = 0
    this.tokens = []
  }

  addToken (begin, end, type) {
    let token = this.ct.substring(begin, end)
    let tk = new Token(token, type, this.line)
    this.tokens.push(tk)
  }

  parse (codeText) {
    this.ct = codeText
    this.pos = 0
    this.end = this.ct.length
    this.tokends = []
    while (this.pos < this.end) {
      this.skipSpaces()
      this.readToken()
    }
    return this.tokens
  }

  checkForComment () {
    // Coments could be added to the token stream
    // TODO skip to endo-of-line comments
    // or block comments
  }

  readToken () {
    // let begin = this.pos
    let c = this.ct.charAt(this.pos)
    let cCode = this.ct.charCodeAt(this.pos)
    if (c === '"' || c === "'") {
      this.readStringLiteral(c)
    } else if (isNum(cCode)) {
      this.readNumber()
    } else if (isAlphaNum(cCode)) {
      this.readIdentifier()
    } else if (isSymbol(cCode)) {
      this.readSymbol()
    } else {
      // nothing found ??
    }
  }

  readStringLiteral (delim) {
    let c = this.ct.charAt(this.pos)
    let begin = this.pos
    if (c !== delim) {
      return
    } else {
      this.pos += 1
    }
    while (this.pos < this.end) {
      // escape sequences are not handled at this point \" \'
      let c = this.ct.charAt(this.pos)
      this.pos += 1
      if (c === delim) {
        break;
      }
    }
    this.addToken(begin, this.pos, 'str')
  }
  
  readNumber () {
    // There are different number formats 
    // TODO now it only handles simple integers.
    // TODO should complex, quaternions be covered here.
    let begin = this.pos
    while (this.pos < this.end) {
      let cCode = this.ct.charCodeAt(this.pos)
      if (isNum(cCode)) {
        this.pos += 1
      } else {
        break;
      }
    }
    this.addToken(begin, this.pos, 'int')
  }

  // pos should be at fist alpha character
  readIdentifier () {
    // There are different number formats 
    // TODO now it only handles alphanum, no emoji.
    let begin = this.pos
    while (this.pos < this.end) {
      let cCode = this.ct.charCodeAt(this.pos)
      if (isAlphaNum(cCode)) {
        this.pos += 1
      } else {
        break;
      }
    }
    this.addToken(begin, this.pos, 'id')
  }

  readSymbol () {
    // language may have compound symbols (=, ==, ===, !=, ->, etc)
    // these need to be choosen in an unambigoud ways
    // that is up to the language designerno emoji.
    let begin = this.pos
    this.pos += 1
    // TODO check for compound symbol operators
    this.addToken(begin, this.pos, 'sym')
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
        if (c === '\n') {
          this.line += 1
        }
      } else if (c === '/' && this.checkForComment()) {
        this.pos += 1
        // Skip the commnent
      } else {
        break
      }
    }
  }
}
