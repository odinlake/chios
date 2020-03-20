#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../nodejs/express
echo "Root: $(pwd)"

while true
do
    echo "Press CTRL+C to stop the script execution"
    git pull
    #npm install
    npm start
    sleep 5
done
