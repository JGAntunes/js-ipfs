'use strict'

const binaryQueryString = require('binary-querystring')

exports = module.exports

// We don't want to stream responses, for now this API
// IS FOR TEST PURPOSES ONLY
const noop = () => {}

exports.subscribe = {
  handler: (request, reply) => {
    const query = request.query
    const topic = query.arg

    if (!topic) {
      return reply(new Error('Missing topic'))
    }

    const ipfs = request.server.app.ipfs

    ipfs.pulsarcast.subscribe(topic, noop, null, (err) => {
      if (err) {
        return reply(err)
      }

      reply({ ok: 1 })
    })
  }
}

exports.create = {
  handler: (request, reply) => {
    const query = request.query
    const topic = query.arg

    if (!topic) {
      return reply(new Error('Missing topic'))
    }

    const ipfs = request.server.app.ipfs

    ipfs.pulsarcast.create(topic, noop, null, (err) => {
      if (err) {
        return reply(err)
      }

      reply({ ok: 1 })
    })
  }
}

exports.publish = {
  handler: (request, reply) => {
    const arg = request.query.arg
    const topic = arg[0]

    const rawArgs = binaryQueryString(request.url.search)
    const buf = rawArgs.arg && rawArgs.arg[1]

    const ipfs = request.server.app.ipfs

    if (!topic) {
      return reply(new Error('Missing topic'))
    }

    if (!buf || buf.length === 0) {
      return reply(new Error('Missing buf'))
    }

    ipfs.pulsarcast.publish(topic, buf, (err) => {
      if (err) {
        return reply(new Error(`Failed to publish to topic ${topic}: ${err}`))
      }

      reply()
    })
  }
}

exports.ls = {
  handler: (request, reply) => {
    const ipfs = request.server.app.ipfs

    ipfs.pulsarcast.ls((err, subscriptions) => {
      if (err) {
        return reply(new Error(`Failed to list subscriptions: ${err}`))
      }

      reply({ Strings: subscriptions })
    })
  }
}

exports.peers = {
  handler: (request, reply) => {
    const topic = request.query.arg
    const ipfs = request.server.app.ipfs

    ipfs.pulsarcast.peers(topic, (err, peers) => {
      if (err) {
        const message = topic
          ? `Failed to find peers subscribed to ${topic}: ${err}`
          : `Failed to find peers: ${err}`

        return reply(new Error(message))
      }

      reply({ Strings: peers })
    })
  }
}
