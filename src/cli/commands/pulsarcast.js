'use strict'

module.exports = {
  command: 'pulsarcast <command>',

  description: 'pulsarcast commands',

  builder (yargs) {
    return yargs
      .commandDir('pulsarcast')
  },

  handler (argv) {}
}
