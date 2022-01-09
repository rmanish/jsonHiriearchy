# TODO:
# This we will run update and move all basic files which we want to change like ci and jest config to run before coomit and 
# we will run git add <updated file> so that everything, which we need should be updated before commit.

cp ./internal/samples/.gitlab-ci-sample.yml .gitlab-ci.yml
git add .gitlab-ci.yml
echo "Everything updated....";