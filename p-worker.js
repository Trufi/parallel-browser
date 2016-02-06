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
    console.log(timeEnd());
    var resultArray = res.join('').split('');
    var str = '3.' + resultArray.join(' ');
    text.innerHTML = str;
    elementCounter.innerHTML = resultArray.length;

    console.log(assert(str));
}
