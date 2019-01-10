'use strict'

module.exports = {
  command: 'pub <topic> <data>',

  describe: 'Publish data to a topic',

  builder: {},

  handler (argv) {
    const data = Buffer.from(String(argv.data))

    argv.ipfs.pulsarcast.publish(argv.topic, data, (err) => {
      if (err) {
        throw err
      }
    })
  }
}
