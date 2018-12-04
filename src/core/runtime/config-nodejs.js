'use strict'

module.exports = () => ({
  "Addresses": {
    "Swarm": [
      "/ip4/127.0.0.1/tcp/4002"
    ],
    "API": "/ip4/127.0.0.1/tcp/5002",
    "Gateway": "/ip4/127.0.0.1/tcp/9090"
  },
  "Discovery": {
    "MDNS": {
      "Enabled": false,
      "Interval": 10
    },
    "webRTCStar": {
      "Enabled": true
    }
  },
  "Bootstrap": []
})
