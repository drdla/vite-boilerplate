#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test

exit 1

# #!/usr/bin/env sh

# . "$(dirname -- "$0")/_/husky.sh"

# # validate-branch-name
# # npx validate-branch-name

# echo "Running pre-commit hook!"

# # lint and format staged files
# npx lint-staged

# # verify typescript staged files
# npx tsc --build .
