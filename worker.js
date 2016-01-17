var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var textNumber = document.querySelector('#text');

elementButton.addEventListener('click', function() {
    spawnWorker(elementNumber.value);
});

var workerCode = (function() {
    function findPrimeNumber(index) {
        var primeNumbers = [];
        var counter = 1;

        while(primeNumbers.length < index - 1) {
            counter++;

            var isComposite = primeNumbers.some(function(el) {
                return counter % el == 0;
            });

            if (!isComposite) {
                primeNumbers.push(counter);
            }
        }

        return counter;
    }

    onmessage = function(ev) {
        var number = parseInt(ev.data, 10);

        if (!number) { return; }

        var res = findPrimeNumber(number);

        postMessage(String(res));
    };
}).toString();

function spawnWorker(value) {
    var blob = new Blob(
       [workerCode.slice(13, -2)],
       {type: 'text/javascript'}
    );
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);
    worker.postMessage(value);

    worker.addEventListener('message', workerMessage);
}

function workerMessage(ev) {
    textNumber.innerHTML += ev.data + ' ';
    ev.srcElement.terminate();
}
