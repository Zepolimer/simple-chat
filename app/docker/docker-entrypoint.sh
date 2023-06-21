#!/bin/bash
set -e

install() {
  npm
  npm install
}

tests() {
  install
  npm run test
}

run() {
  npm run ios
}

case "$1" in
"install")
    echo "Install"
    install
    ;;
"tests")
    echo "Tests"
    tests
    ;;
"run")
    echo "Run"
    run
    ;;
*)
    echo "Custom command : $@"
    exec "$@"
    ;;
esac