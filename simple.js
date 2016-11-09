window.ui.onSubmit(function(value) {
    timeStart();

    var str = '3.';
    var res = [];

    for (var i = 0; i < value; i++) {
        res[i] = pi(i);
    }

    for (var i = 0; i < value; i++) {
        str += res[i] + ' ';
    }

    window.ui.update({time: timeEnd(), equel: assert(str), result: str, counter: i});
});
