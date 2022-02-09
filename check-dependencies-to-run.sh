#!/usr/bin/env bash

set -e
need() {
  command -v $1 >/dev/null 2>&1 || {
    echo >&2 "require $1 but it's not installed.  Aborting."
    exit 1
  }
}
message() {
  echo -e "\n################################################################################"
  echo "# $1"
  echo "################################################################################"
}

message ">>> CHECKING DEPENDENCIES"

need "docker"
need "docker-compose"

message ">>> DEPENDENCIES OK"