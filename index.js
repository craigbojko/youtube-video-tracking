/*
* @Author: Craig Bojko (Craig Bojko)
* @Date:   2016-09-05 11:39:18
* @Last Modified by:   Craig Bojko (Craig Bojko)
* @Last Modified time: 2016-09-27 09:55:55
*/

/* globals mboxTrack */

var ns = process.env.RFC_NAMESPACE
var env = process.env.NODE_ENV

require('./styles/main.less')
var $ = window.jQuery || require('jquery')
var html = require('./templates/main.html')
var Poller = require('./js/util/poller')
var domDependancies = [
  'body'
]

// Script entry
console.group()
console.info('RFC: %s', ns)
console.info('ENV: %s', env)
Poller($, domDependancies, init)
console.groupEnd()

/**
 * Primary function to begin module execution - runs after Polling complete
 * @return {void} - return not necessary
 */
function init () {
  $('body').show()
}
