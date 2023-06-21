#!/bin/bash
set -e

install() {
  yarn
  yarn run build
}

tests() {
  yarn test
}

run() {
  yarn start
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