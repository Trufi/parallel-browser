var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');

var counter = document.createElement('div');
document.body.appendChild(counter);

var text = document.createElement('div');
text.style.wordBreak = 'break-all';
document.body.appendChild(text);
text.innerHTML = '3.';

elementButton.addEventListener('click', function() {
    for (var i = 0; i < parseInt(elementNumber.value, 10); i += 15) {
        spawnWorker(i);
    }
});

var workerCode = calc.toString() +
    (function() {
        onmessage = function(ev) {
            var number = parseInt(ev.data, 10);

            if (!number) { return; }

            var count = 15;
            var res = '';

            for (var i = 0; i < count; i++) {
                res += calc(i + number).slice(0, 1);
            }

            postMessage(res);
        };
    }).toString().slice(13, -2);

function spawnWorker(value) {
    var blob = new Blob(
       [workerCode],
       {type: 'text/javascript'}
    );
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);
    worker.postMessage(value);

    worker.addEventListener('message', workerMessage);
}

function workerMessage(ev) {
    text.innerHTML += ev.data;
    counter.innerHTML = 1;
    ev.srcElement.terminate();
}
