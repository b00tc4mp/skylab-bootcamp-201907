#! /bin/bash

rm -rf ./public/js
mkdir ./public/js 
cp ../x-app/build/static/js/main.*.chunk.js ./public/js/main.js
cp ../x-app/build/static/js/2.*.chunk.js ./public/js/chunk.js

rm -rf ./public/css
mkdir ./public/css 
cp ../x-app/build/static/css/main.*.chunk.css ./public/css/main.css
