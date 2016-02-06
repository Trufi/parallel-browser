var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var elementCounter = document.querySelector('#elementCounter');
var elementResult = document.querySelector('#elementResult');
var elementTime = document.querySelector('#elementTime');
var elementAssert = document.querySelector('#elementAssert');

var str, counter, workerCount, resultCount, resultArray;
var numbersPerWorker = 100;
var maxWorkers = 8;

elementButton.addEventListener('click', function() {
    str = '3.';
    counter = 0;
    workerCount = 0;
    resultCount = parseInt(elementNumber.value, 10);

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

var workerCode = calc.toString() +
    (function() {
        onmessage = function(ev) {
            var number = parseInt(ev.data, 10);

            var count = 100;
            var res = '';

            for (var i = 0; i < count; i++) {
                res += calc(i + number).slice(0, 1);
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
    var res = ev.data;

    for (var i = 0; i < res.count; i++) {
        resultArray[res.index + i] = res.data[i];
    }

    counter += res.count;

    var worker = ev.srcElement;

    if (workerCount * numbersPerWorker < resultCount) {
        worker.postMessage(workerCount * numbersPerWorker);
        workerCount++;
    } else {
        worker.terminate();
    }

    str = '3.' + resultArray.join(' ');

    if (counter >= resultCount) {
        elementTime.innerHTML = 'Time: ' + timeEnd() + 'ms';
        elementAssert.innerHTML = 'Equivalence: ' + assert(str);
    }

    elementResult.innerHTML = str;
    elementCounter.innerHTML = counter;
}
