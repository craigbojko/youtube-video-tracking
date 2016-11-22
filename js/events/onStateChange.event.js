/*
* @Author: Craig Bojko (Craig Bojko)
* @Date:   2016-11-22 11:37:00
* @Last Modified by:   Craig Bojko (Craig Bojko)
* @Last Modified time: 2016-11-22 12:40:51
*/
/* globals YT */

module.exports = function (e) {
  console.info('EVENT: onStateChange:: %s', e.data)
  switch (e.data) {
    case (YT.PlayerState.ENDED):
      console.info('ENDED EVENT...')
      break
    case (YT.PlayerState.PLAYING):
      console.info('PLAYING EVENT...')
      break
    case (YT.PlayerState.PAUSED):
      console.info('PAUSED EVENT...')
      break
    case (YT.PlayerState.BUFFERING):
      console.info('BUFFERING EVENT...')
      break
    case (YT.PlayerState.CUED):
      console.info('CUED EVENT...')
      break
    default: break
  }
}
