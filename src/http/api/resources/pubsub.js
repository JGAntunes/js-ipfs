'use strict'

const PassThrough = require('stream').PassThrough
const bs58 = require('bs58')
const binaryQueryString = require('binary-querystring')

const debug = require('debug')
const log = debug('floodsub:test')

exports = module.exports

// We don't want to stream responses, for now this API
// IS FOR TEST PURPOSES ONLY
function subHandler (topic) {
  return (msg) => {
    log('event %j', {
      event: true,
      from: bs58.decode(msg.from).toString('base64'),
      seqno: msg.seqno.toString('base64'),
      topic
    })
  }
}

exports.subscribe = {
  handler: (request, reply) => {
    const query = request.query
    const discover = query.discover === 'true'
    const topic = query.arg

    if (!topic) {
      return reply(new Error('Missing topic'))
    }

    const ipfs = request.server.app.ipfs

    ipfs.pubsub.subscribe(topic, subHandler(topic), { discover: discover }, (err) => {
      if (err) {
        return reply(err)
      }

      log('subscription %j', {
        subscription: true,
        topic
      })

      reply({ topic })
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

    ipfs.pubsub.publish(topic, buf, (err) => {
      if (err) {
        return reply(new Error(`Failed to publish to topic ${topic}: ${err}`))
      }

      log('publish', {
        publish: true,
        topic
      })

      reply({
        topic
      })
    })
  }
}

exports.ls = {
  handler: (request, reply) => {
    const ipfs = request.server.app.ipfs

    ipfs.pubsub.ls((err, subscriptions) => {
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

    ipfs.pubsub.peers(topic, (err, peers) => {
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
