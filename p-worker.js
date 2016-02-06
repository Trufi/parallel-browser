var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');

var elementCounter = document.createElement('div');
document.body.appendChild(elementCounter);

var text = document.createElement('div');
document.body.appendChild(text);
text.innerHTML = '3.';

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

function workerFunction(number) {
    var count = 100;
    var res = '';

    for (var i = 0; i < count; i++) {
        res += calc(i + number).slice(0, 1);
    }

    return {
        data: res,
        index: number,
        count: count
    };
}

function spawnWorker() {
    var worker = new Parallel(workerCount * numbersPerWorker);
    worker
        .require(calc)
        .spawn(workerFunction)
        .then(workerDone);

    workerCount++;
}

function workerDone(res) {
    for (var i = 0; i < res.count; i++) {
        resultArray[res.index + i] = res.data[i];
    }

    counter += res.count;

    if (workerCount * numbersPerWorker < resultCount) {
        spawnWorker();
    }

    if (counter >= resultCount) {
        console.log(timeEnd());
    }

    text.innerHTML = '3.' + resultArray.join(' ');
    elementCounter.innerHTML = counter;
    textNumber.innerHTML += res + ' ';
}
