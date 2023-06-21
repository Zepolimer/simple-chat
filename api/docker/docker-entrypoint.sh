#!/bin/bash
set -e

install() {
  yarn
  yarn install
}

tests() {
  install
  yarn run test
}

run() {
  yarn run dev
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