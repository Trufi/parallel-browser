#!/bin/sh
emcc pi.cpp -O3 -s EXPORTED_FUNCTIONS="['_calcpi']"
