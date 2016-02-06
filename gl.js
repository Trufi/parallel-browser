var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');

var loadShaderCode = new Promise(function(resolve) {
    var req = new XMLHttpRequest();
    req.open('GET', './shader.glsl', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            resolve(req.responseText);
        }
    };
    req.send(null);
});

elementButton.addEventListener('click', function() {
    var counter = document.createElement('div');
    document.body.appendChild(counter);

    var text = document.createElement('div');
    document.body.appendChild(text);

    var value = parseInt(elementNumber.value, 10);

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

        console.log(timeEnd());

        var hx = '0123456789ABCDEF';
        var str = '3.';

        for (var i = 0; i < res.length; i++) {
            str += hx[res[i]] + ' ';
        }

        text.innerHTML = str;
        counter.innerHTML = res.length;

        console.log(assert(str));
    });
});
