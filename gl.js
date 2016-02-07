var loadShaderCode = new Promise(function(resolve) {
    var req = new XMLHttpRequest();
    req.open('GET', './utils/pi.glsl', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            resolve(req.responseText);
        }
    };
    req.send(null);
});

window.ui.onSubmit(function(value) {
    var data = new Float32Array(value);

    for (var i = 0; i < data.length; i++) {
        data[i] = i;
    }

    loadShaderCode.then(function(code) {
        timeStart();

        var res = gpgpu(code, data, {
            dimension: 1,
            fullCode: true
        });

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
});
