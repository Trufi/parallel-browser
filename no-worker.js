var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var textNumber = document.querySelector('#text');

elementButton.addEventListener('click', function() {
    var number = parseInt(elementNumber.value, 10);

    if (!number) { return; }

    var res = findPrimeNumber(number);

    textNumber.innerHTML += res + ' ';
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
