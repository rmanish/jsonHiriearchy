#!/bin/sh
# If using NPM, `npm run subm:update-branch <branch_name> <submodule_path>`
# $1 - branch-name, $2 - submodule-path in local, ref - src/schema
git config -f .gitmodules submodule.$2.branch $1
cd $2
git checkout -b $1 --track origin/$1
cd -
git submodule update --remote --rebase
