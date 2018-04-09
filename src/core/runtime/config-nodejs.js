'use strict'

module.exports = () => ({
  "Addresses": {
    "Swarm": [
      "/ip4/127.0.0.1/tcp/4002",
      "/ip4/127.0.0.1/tcp/4003/ws"
    ],
    "API": "/ip4/127.0.0.1/tcp/5002",
    "Gateway": "/ip4/127.0.0.1/tcp/9090"
  },
  "Discovery": {
    "MDNS": {
      "Enabled": true,
      "Interval": 10
    },
    "webRTCStar": {
      "Enabled": true
    }
  },
  "Bootstrap": []
})
