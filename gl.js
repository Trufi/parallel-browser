var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');
var elementCounter = document.querySelector('#elementCounter');
var elementResult = document.querySelector('#elementResult');
var elementTime = document.querySelector('#elementTime');
var elementAssert = document.querySelector('#elementAssert');

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

elementButton.addEventListener('click', function() {
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

        elementTime.innerHTML = 'Time: ' + timeEnd() + 'ms';

        var hx = '0123456789ABCDEF';
        var str = '3.';

        for (var i = 0; i < res.length; i++) {
            str += hx[res[i]] + ' ';
        }

        elementResult.innerHTML = str;
        elementCounter.innerHTML = res.length;
        elementAssert.innerHTML = 'Equivalence: ' + assert(str);
    });
});
