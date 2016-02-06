var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var elementCounter = document.querySelector('#elementCounter');
var elementResult = document.querySelector('#elementResult');
var elementTime = document.querySelector('#elementTime');
var elementAssert = document.querySelector('#elementAssert');

var numbersPerWorker = 100;
var resultCount = 0;
var maxWorkers = 8;

elementButton.addEventListener('click', function() {
    resultCount = parseInt(elementNumber.value, 10);

    timeStart();
    spawnWorker();
});

function workerFunction(number) {
    var count = 100;
    var res = '';

    for (var i = 0; i < count; i++) {
        res += calc(i + number).slice(0, 1);
    }

    return res;
}

function spawnWorker() {
    var array = [];

    for (var i = 0; i < Math.ceil(resultCount / numbersPerWorker); i++) {
        array[i] = i * numbersPerWorker;
    }

    var worker = new Parallel(array, {
        maxWorkers: maxWorkers
    });
    worker
        .require(calc)
        .map(workerFunction)
        .then(workerDone);
}

function workerDone(res) {
    var time = timeEnd();

    var resultArray = res.join('').split('');
    var str = '3.' + resultArray.join(' ');

    elementResult.innerHTML = str;
    elementCounter.innerHTML = resultArray.length;
    elementTime.innerHTML = 'Time: ' + time + 'ms';
    elementAssert.innerHTML = 'Equivalence: ' + assert(str);
}
