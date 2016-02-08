var resultCount;
var numbersPerWorker = 100;
var maxWorkers = 8;

window.ui.onSubmit(function(value) {
    resultCount = value;
    timeStart();
    spawnWorker();
});

function workerFunction(number) {
    var numbersPerWorker = 100;
    var res = '';

    for (var i = 0; i < numbersPerWorker; i++) {
        res += pi(i + number);
    }

    return res;
}

function spawnWorker() {
    var array = [];
    for (var i = 0; i < Math.ceil(resultCount / numbersPerWorker); i++) {
        array[i] = i * numbersPerWorker;
    }

    new Parallel(array, {
            maxWorkers: maxWorkers
        })
        .require(pi)
        .map(workerFunction)
        .then(workerDone);
}

function workerDone(res) {
    var time = timeEnd();

    var resultArray = res.join('').split('');
    var str = '3.' + resultArray.join(' ');

    window.ui.update({
        result: str,
        counter: resultArray.length,
        time: timeEnd(),
        equel: assert(str)
    });
}
