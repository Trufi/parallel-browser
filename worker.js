var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');

var elementCounter = document.createElement('div');
document.body.appendChild(elementCounter);

var text = document.createElement('div');
text.style.wordBreak = 'break-all';
document.body.appendChild(text);
text.innerHTML = '3.';

var numbersPerWorker = 15;
var resultArray = [];
var counter = 0;
var resultCount = 0;
var maxWorkers = 5;
var workerCount = 0;

elementButton.addEventListener('click', function() {
    resultCount = parseInt(elementNumber.value, 10);

    for (var i = 0; i < resultCount; i++) {
        resultArray[i] = '-';
    }

    run();
});

function run() {
    for (var i = 0; i < maxWorkers; i++) {
        spawnWorker();
    }
}

var workerCode = calc.toString() +
    (function() {
        onmessage = function(ev) {
            var number = parseInt(ev.data, 10);

            var count = 15;
            var res = '';

            for (var i = 0; i < count; i++) {
                res += calc(i + number).slice(0, 1);
            }

            postMessage(JSON.stringify({
                data: res,
                index: number,
                count: count
            }));
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
    var res = JSON.parse(ev.data);

    for (var i = 0; i < res.count; i++) {
        resultArray[res.index + i] = res.data[i];
    }

    counter += res.count;

    ev.srcElement.terminate();

    if (workerCount * numbersPerWorker < resultCount) {
        spawnWorker();
    } else {
    //    text.innerHTML = '3.' + resultArray.join('');
    }

    text.innerHTML = '3.' + resultArray.join('');

    elementCounter.innerHTML = counter;
}
