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
        elementTime.innerHTML = 'Time: ' + timeEnd() + 'ms';
        elementAssert.innerHTML = 'Equivalence: ' + assert(str);
    }

    elementResult.innerHTML = str;
    elementCounter.innerHTML = counter;
}
