var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');

var elementCounter = document.createElement('div');
document.body.appendChild(elementCounter);

var text = document.createElement('div');
document.body.appendChild(text);

var str = '3.';

var numbersPerWorker = 100;
var resultArray = [];
var counter = 0;
var resultCount = 0;
var maxWorkers = 8;
var workerCount = 0;

elementButton.addEventListener('click', function() {
    resultCount = parseInt(elementNumber.value, 10);

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

    ev.srcElement.terminate();

    if (workerCount * numbersPerWorker < resultCount) {
        spawnWorker();
    }

    str = '3.' + resultArray.join(' ');

    if (counter >= resultCount) {
        console.log(timeEnd());
        console.log(assert(str));
    }

    text.innerHTML = str;
    elementCounter.innerHTML = counter;
}
