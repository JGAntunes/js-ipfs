#! /usr/bin/env bash

set -e

if [ -n "$IPFS_PATH" ]; then
  echo "Using $IPFS_PATH as IPFS repository"
else
  echo "You need to set IPFS_PATH environment variable to use this script"
  exit 1
fi

# Initialize the repo but ignore if error if it already exists
# This can be the case when we restart a container without stopping/removing it
node src/cli/bin.js init $IPFS_CONFIG || true

# IPFS_API_HOST=$(hostname -I | awk '{print $1}')

# if [ -n "$IPFS_API_HOST" ]; then
#   sed -i.bak "s/0.0.0.0/$IPFS_API_HOST/g" "$IPFS_PATH/config"
# fi

node src/cli/bin.js daemon --enable-dht-experiment --enable-pubsub-experiment
