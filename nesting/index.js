var worker = new Worker('./mainWorker.js');

var array = ['H', 'e', 'l', 'l', 'o'];

worker.postMessage(array);
worker.addEventListener('message', function(ev) {
    console.log(ev.data);
});
