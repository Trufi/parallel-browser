onmessage = function(ev) {
    var array = ev.data;

    for (var i = 0; i < array.length; i++) {
        (function() {
            var worker = new Worker('./subWorker.js');

            worker.postMessage(array[i]);

            worker.addEventListener('message', function(ev) {
                postMessage(ev.data);
                worker.terminate();
            });
        })();
    }
};
