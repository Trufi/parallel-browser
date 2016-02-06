var fs = require('fs');
var path = require('path');

var length = 1000000;
var obj = new Array(length);

function random() {
    return Math.round(Math.random() * 100000000);
}

for (var i = 0; i < length; i++) {
    obj[i] = random();
}

fs.writeFileSync(path.join(__dirname, './giant.js'), 'var giant = ' + JSON.stringify(obj) + ';', 'utf8');
fs.writeFileSync(path.join(__dirname, './giantTyped.js'), 'var giantTyped = new Float32Array(' + JSON.stringify(obj) + ');', 'utf8');
