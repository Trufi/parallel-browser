var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var textNumber = document.querySelector('#text');

elementButton.addEventListener('click', function() {
    spawnWorker(elementNumber.value);
});

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

function spawnWorker(value) {
    var worker = new Parallel(value);
    worker
        .spawn(findPrimeNumber)
        .then(workerDone);
}

function workerDone(res) {
    textNumber.innerHTML += res + ' ';
}
