window.ui.onSubmit(function(value) {
    var str = '3.';
    var numberAtOnce = 1;

    timeStart();

    UnblockingFor(i => {
        for (var j = 0; j < numberAtOnce; j++) {
            str += pi(i + j) + ' ';

            window.ui.update({result: str});
        }
        window.ui.update({counter: i + 1});
    }, value, numberAtOnce, function() {
        window.ui.update({time: timeEnd(), equel: assert(str)});
    });
});

function UnblockingFor(iterator, times, count, cb) {
    var index = 0;
    next(index);

    function next(i) {
        setTimeout(function() {
            iterator(i);
            index += count;
            if (index < times) {
                next(index);
            } else {
                cb();
            }
        }, 0);
    }
}
