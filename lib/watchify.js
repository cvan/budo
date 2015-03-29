var spawn = require('npm-execspawn')
var quote = require('shell-quote').quote

//Runs watchify with given args, returns process
module.exports = function(watchifyArgs) {
  var cmd = ['watchify']
    .concat(quote(watchifyArgs || []))
    .join(' ')

  var proc = spawn(cmd)
  proc.stderr.on('data', function(err) {
    process.stderr.write(err.toString())
  })

  var hasClosed = false
  process.on('close', handleClose)
  process.on('exit', handleClose)

  return proc

  function handleClose() {
    if (hasClosed) return
    hasClosed = true
    proc.kill()
  }
}