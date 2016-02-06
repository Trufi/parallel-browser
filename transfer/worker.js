onmessage = function(ev) {
    var data = new Float32Array(ev.data.obj);
    postMessage({
        text: ev.data.text + ' How are you?',
        data: data
    });
};
