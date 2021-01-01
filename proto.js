
import * as spider from './jslib/spider.js'

export function newSpider () {
  return new spider.Spider()
}

// add an entry point to the global world
window.newSpider = newSpider;
