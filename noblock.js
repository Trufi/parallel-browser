var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var elementCounter = document.querySelector('#elementCounter');
var elementResult = document.querySelector('#elementResult');
var elementTime = document.querySelector('#elementTime');
var elementAssert = document.querySelector('#elementAssert');

elementButton.addEventListener('click', function() {
    var str = '3.';
    var count = 1;
    var value = parseInt(elementNumber.value, 10);

    timeStart();

    UnblockingFor(i => {
        for (var j = 0; j < count; j++) {
            str += String(calc(i + j)).slice(0, 1) + ' ';
            elementResult.innerHTML = str;
        }
        elementCounter.innerHTML = i + 1;
    }, value, count, function() {
        elementTime.innerHTML = 'Time: ' + timeEnd() + 'ms';
        elementAssert.innerHTML = 'Equivalence: ' + assert(str);
    });
});

function UnblockingFor(iterator, times, count, cb) {
    var index = 0;
    next(index);

    function next(i) {
        setTimeout(function() {
            iterator(i);
            index += count;
            if (index < times) {
                next(index);
            } else {
                cb();
            }
        }, 0);
    }
}
