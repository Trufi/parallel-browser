#!/bin/sh
emcc pi.cpp -s EXPORTED_FUNCTIONS="['_calcpi']"
