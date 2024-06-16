#!/usr/bin/env bash

main_branch="main"

branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "$main_branch" ]; then
  echo "You probably didn't intend to push directly to '$main_branch'." >&2
  echo "If you're sure that that's what you want to do, bypass this check via" >&2
  echo "" >&2
  echo "  git push --no-verify" >&2
  echo "" >&2
  exit 1
fi
