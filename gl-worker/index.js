var loadShaderCode = new Promise(function(resolve) {
    var req = new XMLHttpRequest();
    req.open('GET', '../utils/pi.glsl', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            resolve(req.responseText);
        }
    };
    req.send(null);
});

var canvas = document.createElement('canvas');
var offscreen = canvas.transferControlToOffscreen();

var worker = new Worker('./gpgpu.js');

worker.addEventListener('message', function(ev) {
    var res = ev.data;
    elementTime.innerHTML = 'Time: ' + timeEnd() + 'ms';

    var hx = '0123456789ABCDEF';
    var str = '3.';

    for (var i = 0; i < res.length; i++) {
        str += hx[res[i]] + ' ';
    }    

    window.ui.update({
        result: str,
        counter: res.length,
        time: timeEnd(),
        equel: assert(str)
    });
});

window.ui.onSubmit(function(value) {
    var data = new Float32Array(value);

    for (var i = 0; i < data.length; i++) {
        data[i] = i;
    }

    loadShaderCode.then(function(code) {
        timeStart();

        worker.postMessage({
            code: code,
            data: data,
            canvas: offscreen,
            options: {
                dimension: 1,
                fullCode: true
            }
        }, [
            offscreen
        ]);
    });
});
