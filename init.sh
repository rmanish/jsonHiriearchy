#!/bin/sh

ENV=dev
if [ -z "$1" ]
  then
    echo "No argument supplied selecting dev enviroment"
  else
    ENV=$1
fi

# git submodule update --init
# git submodule update --remote --rebase
# git config --global submodule.recurse true

npm install
if [ -z "$2" ]
  then
    echo "updating env file for ${ENV} Enviroment..."
    cp env/.env.$ENV .env
  else
    echo "Enviroment File is not beaing updated..."    
fi
