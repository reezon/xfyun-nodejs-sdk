const API = require('./lib/common')

API.mixin(require('./lib/tts'))
API.mixin(require('./lib/iat'))
API.mixin(require('./lib/ise'))
API.mixin(require('./lib/rtasr'))

module.exports = API
