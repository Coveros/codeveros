#!/bin/bash
set -e

if [ $# -gt 0 ]; then
    VERSION=$1
else
    VERSION=latest
fi

DOCKER_IMAGE="coveros/codeveros-ui:${VERSION}"

docker build -t "$DOCKER_IMAGE" .
