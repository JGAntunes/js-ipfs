'use strict'

const resources = require('./../resources')

module.exports = (server) => {
  const api = server.select('API')

  api.route({
    method: '*',
    path: '/api/v0/pulsarcast/sub',
    config: {
      handler: resources.pulsarcast.subscribe.handler
    }
  })

  api.route({
    method: '*',
    path: '/api/v0/pulsarcast/create',
    config: {
      handler: resources.pulsarcast.create.handler
    }
  })

  api.route({
    method: '*',
    path: '/api/v0/pulsarcast/pub',
    config: {
      handler: resources.pulsarcast.publish.handler
    }
  })

  api.route({
    method: '*',
    path: '/api/v0/pulsarcast/ls',
    config: {
      handler: resources.pulsarcast.ls.handler
    }
  })

  api.route({
    method: '*',
    path: '/api/v0/pulsarcast/peers',
    config: {
      handler: resources.pulsarcast.peers.handler
    }
  })
}
