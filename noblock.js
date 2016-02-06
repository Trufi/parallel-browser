var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var textNumber = document.querySelector('#text');

elementButton.addEventListener('click', function() {
    var counter = document.createElement('div');
    document.body.appendChild(counter);

    var text = document.createElement('div');
    document.body.appendChild(text);
    text.innerHTML = '3.';

    var count = 1;

    timeStart();

    UnblockingFor(i => {
        for (var j = 0; j < count; j++) {
            text.innerHTML += String(calc(i + j)).slice(0, 1) + ' ';
        }
        counter.innerHTML = i;
    }, parseInt(elementNumber.value, 10), count, function() {
        console.log(timeEnd());
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
