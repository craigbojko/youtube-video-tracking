/*
* @Author: Craig Bojko (Craig Bojko)
* @Date:   2016-09-05 11:39:18
* @Last Modified by:   Craig Bojko (Craig Bojko)
* @Last Modified time: 2016-11-18 16:00:34
*/

/* globals mboxTrack */

var ns = process.env.RFC_NAMESPACE
var env = process.env.NODE_ENV

require('./styles/main.less')

var $
var config = require('./config')
var html = require('./templates/main.html')
var Poller = require('./js/util/poller')
var domDependancies = [
  'body'
]

// Script entry
console.group()
console.info('RFC: %s', ns)
console.info('ENV: %s', env)
if (config && config.jquery && config.jquery === true) {
  $ = require('jquery')
  Poller($, domDependancies, init)
} else {
  Poller(domDependancies, function () {
    $ = window.jQuery
    init()
  })
}
console.groupEnd()

/**
 * Primary function to begin module execution - runs after Polling complete
 * @return {void} - return not necessary
 */
function init () {
  console.log(config)
  $('body').show()
}
