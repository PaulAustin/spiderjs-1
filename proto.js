
import * as slib from './jslib/spider.js'

export function initSpider (message) {
  console.log('Howdy from initSpider!', message)
  return new slib.Spider()
}

// add an entry point to the global world
window.initSpider = initSpider;
