/* eslint-env mocha */

const fs = require('fs')
const ncp = require('ncp').ncp
const rimraf = require('rimraf')
const expect = require('chai').expect

describe('core', () => {
  const repoExample = process.cwd() + '/test/go-ipfs-repo'
  const repoTests = process.cwd() + '/test/repo-tests-run'

  before((done) => {
    ncp(repoExample, repoTests, (err) => {
      process.env.IPFS_PATH = repoTests
      expect(err).to.equal(null)
      done()
    })
  })

  after((done) => {
    rimraf(repoTests, (err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  const tests = fs.readdirSync(__dirname)
  tests.filter((file) => {
    if (file === 'index.js' ||
        file.endsWith('browser.js')) {
      return false
    } else {
      return true
    }
  }).forEach((file) => {
    require('./' + file)
  })
})
