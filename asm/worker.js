importScripts('./a.out.js');

var wrapasmpi = Module.cwrap('calcpi', 'number', ['number']);
var hx = '0123456789ABCDEF';

function asmpi(i) {
    return hx[wrapasmpi(i)];
}

onmessage = function(ev) {
    var number = parseInt(ev.data, 10);

    var count = 100;
    var res = '';

    for (var i = 0; i < count; i++) {
        res += asmpi(i + number);
    }

    postMessage({
        data: res,
        index: number,
        count: count
    });
};
