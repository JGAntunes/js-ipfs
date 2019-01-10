'use strict'

module.exports = {
  command: 'sub <topic>',

  describe: 'Subscribe to a topic',

  builder: {},

  handler (argv) {
    argv.ipfs.pulsarcast.subscribe(argv.topic, (err) => {
      if (err) {
        throw err
      }
    })
  }
}
