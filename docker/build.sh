#!/bin/bash

SCRIPT_DIR=$(dirname "$0")
cd $SCRIPT_DIR/../

if [ "$2" = "" ]; then
    echo "Usage: ./build.sh [dev|prod] TAG"    
    exit
fi

case "$1" in
    "dev")
        docker build -f docker/dev.dockerfile -t docker.biss.com/website-dev:$1 .        
        ;;
    "prod")
        ;;
    *)
        echo "Usage: ./build.sh [dev|prod] TAG"
        ;;
esac



