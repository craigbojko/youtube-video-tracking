
function poll ($, domDependancies, cb, time) {
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
      poll($, domDependancies, cb, time * 1.5)
    }, time)
  }
}

module.exports = poll