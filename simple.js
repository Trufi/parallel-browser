window.ui.onSubmit(function(value) {
    timeStart();

    var str = '3.';

    for (var i = 0; i < value; i++) {
        str += pi(i) + ' ';

        window.ui.update({result: str, counter: i + 1});
    }

    window.ui.update({time: timeEnd(), equel: assert(str)});
});
