var str, counter, workerCount, resultCount, resultArray;
var numbersPerWorker = 100;
var maxWorkers = 8;

window.ui.onSubmit(function(value) {
    str = '3.';
    counter = 0;
    workerCount = 0;
    resultCount = value;

    resultArray = [];
    for (var i = 0; i < resultCount; i++) {
        resultArray[i] = '-';
    }

    run();
});

function run() {
    timeStart();

    for (var i = 0; i < maxWorkers; i++) {
        spawnWorker();
    }
}

function spawnWorker() {
    var worker = new Worker('./worker.js');
    worker.postMessage(workerCount * numbersPerWorker);

    worker.addEventListener('message', workerMessage);
    workerCount++;
}

function workerMessage(ev) {
    var res = ev.data;

    for (var i = 0; i < res.count; i++) {
        resultArray[res.index + i] = res.data[i];
    }

    counter += res.count;

    var worker = ev.target;

    if (workerCount * numbersPerWorker < resultCount) {
        worker.postMessage(workerCount * numbersPerWorker);
        workerCount++;
    } else {
        worker.terminate();
    }

    str = '3.' + resultArray.join(' ');

    if (counter >= resultCount) {
        window.ui.update({time: timeEnd(), equel: assert(str)});
    }

    window.ui.update({result: str, counter: counter});
}
