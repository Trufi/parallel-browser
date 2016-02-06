var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var elementCounter = document.querySelector('#elementCounter');
var elementResult = document.querySelector('#elementResult');
var elementTime = document.querySelector('#elementTime');
var elementAssert = document.querySelector('#elementAssert');

elementButton.addEventListener('click', function() {
    timeStart();

    var str = '3.';

    for (var i = 0; i < parseInt(elementNumber.value, 10); i++) {
        str += String(calc(i)).slice(0, 1) + ' ';
        elementResult.innerHTML = str;
        elementCounter.innerHTML = i + 1;
    }

    elementTime.innerHTML = 'Time: ' + timeEnd() + 'ms';
    elementAssert.innerHTML = 'Equivalence: ' + assert(str);
});
