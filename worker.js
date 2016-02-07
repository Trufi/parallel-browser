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

var workerCode = pi.toString() +
    (function() {
        onmessage = function(ev) {
            var number = parseInt(ev.data, 10);

            var count = 100;
            var res = '';

            for (var i = 0; i < count; i++) {
                res += pi(i + number);
            }

            postMessage({
                data: res,
                index: number,
                count: count
            });
        };
    }).toString().slice(13, -2);

function spawnWorker() {
    var blob = new Blob(
       [workerCode],
       {type: 'text/javascript'}
    );
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);
    worker.postMessage(workerCount * numbersPerWorker);

    worker.addEventListener('message', workerMessage);
    workerCount++;
}

function workerMessage(ev) {
    var worker = ev.target;

    if (workerCount * numbersPerWorker < resultCount) {
        worker.postMessage(workerCount * numbersPerWorker);
        workerCount++;
    } else {
        worker.terminate();
    }
    
    var res = ev.data;

    for (var i = 0; i < res.count; i++) {
        resultArray[res.index + i] = res.data[i];
    }

    counter += res.count;

    str = '3.' + resultArray.join(' ');

    if (counter >= resultCount) {
        window.ui.update({time: timeEnd(), equel: assert(str)});
    }

    window.ui.update({result: str, counter: counter});
}
