'use strict'

module.exports = {
  command: 'create <topic>',

  describe: 'Create a topic',

  builder: {},

  handler (argv) {
    argv.ipfs.pulsarcast.createTopic(argv.topic, (err) => {
      if (err) {
        throw err
      }
    })
  }
}
