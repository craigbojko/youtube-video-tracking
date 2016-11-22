/*
* @Author: Craig Bojko (Craig Bojko)
* @Date:   2016-09-05 11:39:18
* @Last Modified by:   Craig Bojko (Craig Bojko)
* @Last Modified time: 2016-11-22 12:40:45
*/

/* globals YT */

var ns = process.env.RFC_NAMESPACE
var env = process.env.NODE_ENV

require('./styles/main.less')

var $
var Player
var _id = ns + '-player'
var config = require('./config')
var Poller = require('./js/util/poller')
var domDependancies = [
  'body'
]

// Script entry
console.group()
console.info('RFC: %s', ns)
console.info('ENV: %s', env)

// for API callback (required: https://developers.google.com/youtube/iframe_api_reference#Requirements)
window['onYouTubeIframeAPIReady'] = init

if (config && config.jquery && config.jquery === true) {
  $ = require('jquery')
  Poller($, domDependancies, function () {
    loadIFrameAPI(apiLocalCallback)
  })
} else {
  Poller(domDependancies, function () {
    $ = window.jQuery
    loadIFrameAPI(apiLocalCallback)
  })
}
console.groupEnd()

/**
 * Primary function to begin module execution - runs after YT API is finsihed loading
 * @return {void} - return not necessary
 */
function init () {
  var events = {}
  var requireEvent = require.context('./js/events', true, /\.event\.js$/)

  requireEvent.keys().forEach(function (i) {
    events[i.substring(2).replace(/\.event\.js/ig, '')] = requireEvent(i)
  })

  console.info(config)
  injectPlayer()
  loadPlayer(events)
  $('body').show()
}

function apiLocalCallback (data) {
  console.info('YOUTUBE IFRAME API LOADED')
}

function loadIFrameAPI (callback) {
  $.getScript('https://www.youtube.com/iframe_api', callback)
}

function injectPlayer () {
  var $PlayerWrapper = $('<div id="' + _id + '"></div>')
  var $inject = config && config.targetInsertBefore && $(config.targetInsertBefore)
  $PlayerWrapper.insertBefore($inject)
}

function loadPlayer (eventObj) {
  Player = new YT.Player(_id, {
    height: config.height,
    width: config.width,
    videoId: config.videoId,
    events: eventObj
  })
}
