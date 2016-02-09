console.time('workerCreate');
console.time('workerAnswer');

var worker = new Worker('./worker.js');

worker.postMessage({
    text: 'Hello World!',
    obj: giant
});

console.timeEnd('workerCreate');

worker.addEventListener('message', function(ev) {
    console.timeEnd('workerAnswer');
    console.log(ev.data);
});




// worker.postMessage({
//     text: 'Hello World!',
//     obj: giantTyped.buffer
// }, [
//     giantTyped.buffer
// ]);
