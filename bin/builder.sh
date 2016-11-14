#!/bin/bash

npm update
npm run development
npm run production
git status
git add .
git commit -am "Auto publish"
git push origin master
npm version patch
git push --tags
npm publish
