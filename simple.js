window.ui.onSubmit(function(value) {
    timeStart();

    var str = '3.';

    for (var i = 0; i < value; i++) {
        str += pi(i) + ' ';

        window.ui.update({result: str, counter: i + 1});
    }

    window.ui.update({time: timeEnd(), equel: assert(str)});
});

// var wrapasmpi = Module.cwrap('calcpi', 'number', ['number']);
// var hx = '0123456789ABCDEF';
//
// function asmpi(i) {
//     return hx[wrapasmpi(i)];
// }
