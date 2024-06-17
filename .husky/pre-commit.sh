#!/usr/bin/env sh

. "$(dirname -- "$0")/_/husky.sh"

# validate-branch-name
# npx validate-branch-name

# lint and format staged files
npx lint-staged

# verify typescript staged files
npx tsc --build .
