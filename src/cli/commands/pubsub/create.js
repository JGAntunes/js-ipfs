'use strict'

const print = require('../../utils').print

module.exports = {
  command: 'create <topic>',

  describe: 'Create a topic',

  builder: {},

  handler (argv) {
    const handler = (msg) => {
      print(msg.data.toString())
    }

    argv.ipfs.pubsub.createTopic(argv.topic, handler, (err) => {
      if (err) {
        throw err
      }
    })
  }
}
