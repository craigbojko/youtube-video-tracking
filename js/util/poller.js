/*
* @Author: Craig Bojko (Craig Bojko)
* @Date:   2016-11-18 15:01:20
* @Last Modified by:   Craig Bojko (Craig Bojko)
* @Last Modified time: 2016-11-18 15:25:33
*/

var count = 0

module.exports = function (arg1, arg2, arg3) {
  if (typeof arg1 === 'function') { // JQuery object supplied
    pollWithJquery(arg1, arg2, arg3)
  } else { // Get jquery from window scope
    pollWithoutJquery(arg1, arg2)
  }
}

function pollWithJquery ($, domDependancies, cb, time) {
  time = time || 50
  var domCheck = 0
  for (var i = 0; i < domDependancies.length; i++) {
    if ($(domDependancies[i]).length) {
      domCheck++
    }
  }
  console.log('POLLER: DC:: %s', domCheck)
  if ($ && domCheck === domDependancies.length) {
    cb()
  } else {
    setTimeout(function () {
      pollWithJquery($, domDependancies, cb, time * 1.5)
    }, time)
  }
}

function pollWithoutJquery (domDependancies, cb, time) {
  time = time || 50
  var $ = window.jQuery
  var domCheck = 0

  if (count >= 5) {
    document.getElementsByTagName('body')[0].style.display = 'block'
    console.error('POLLER FAILED WITHIN 5 ATTEMPTS.')
  }

  for (var i = 0; i < domDependancies.length; i++) {
    if ($ && $(domDependancies[i]).length) {
      domCheck++
    }
  }
  console.log('POLLER: DC:: %s', domCheck)

  if ($ && domCheck === domDependancies.length) {
    cb()
  } else {
    count++
    setTimeout(function () {
      pollWithoutJquery(domDependancies, cb, time * 1.5)
    }, time)
  }
}
