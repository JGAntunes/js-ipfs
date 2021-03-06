'use strict'

const Hoek = require('hoek')
const debug = require('debug')

const log = debug('jsipfs:http-api')
log.error = debug('jsipfs:http-api:error')
log.debug = debug('jsipfs:http-api:debug')

module.exports = (api, server) => {
  server.ext('onRequest', (request, reply) => {
    request.handleError = handleError
    reply.continue()
  })

  server.ext('onPreResponse', (request, reply) => {
    const res = request.response
    const req = request.raw.req

    let statusCode = 200
    let msg = 'Sorry, something went wrong, please retrace your steps.'
    let code = 1

    if (res.isBoom) {
      statusCode = res.output.payload.statusCode
      msg = res.output.payload.message

      if (res.data && res.data.code !== undefined) {
        code = res.data.code
      }

      if (res.message && res.isDeveloperError) {
        msg = res.message.replace('Uncaught error: ', '')
      }

      const debug = {
        stack: res.stack,
        method: req.method,
        url: request.url.path,
        headers: request.raw.req.headers,
        info: request.info,
        payload: request.payload,
        response: res.output.payload
      }

      log.error('error %j', debug)

      reply({
        Message: msg,
        Code: code,
        Type: 'error'
      }).code(statusCode)
      return
    }

    reply.continue()
  })
}

function handleError (error, errorMessage) {
  if (errorMessage) {
    return Hoek.assert(!error, errorMessage)
  }

  return Hoek.assert(!error, error)
}
