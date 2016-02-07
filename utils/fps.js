(function() {
    var time;

    if (performance && performance.now) {
        time = performance.now.bind(performance);
    } else {
        time = Date.now.bind(Date);
    }

    var lastTime;
    var frames = 0;
    var x = 0;
    var maxFps = 60;
    var lastFps = [];

    var container = document.querySelector('#fps');
    container.style.display = 'inline-block';

    var fpsElement = document.createElement('div');
    fpsElement.style.fontSize = '26px';
    fpsElement.style.fontWeight = 700;
    fpsElement.style.height = '40px';
    fpsElement.style.textAlign = 'right';
    container.appendChild(fpsElement);

    var canvas = document.createElement('canvas');
    canvas.style.borderBottom = '1px solid #000000';
    container.appendChild(canvas);

    var width = canvas.width = 400;
    var height = canvas.height = 150;
    var offset = 5;

    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;

    var distance = 5;

    function y(val) {
        return height - val / maxFps * (height - offset);
    }

    var maxLength = Math.floor((width - offset * 2) / distance);

    function update() {
        var length = lastFps.length;
        var deltaLength = length - maxLength;

        if (deltaLength > 0) {
            lastFps = lastFps.slice(deltaLength);
            length -= deltaLength;
        }

        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.moveTo(0, y(lastFps[0]));

        for (var i = 1; i < length; i++) {
            ctx.lineTo(i * distance + offset, y(lastFps[i]));
        }

        ctx.stroke();

        fpsElement.innerHTML = lastFps[length - 1];
    }

    function frame() {
        requestAnimationFrame(frame);

        var now = time();

        if (!lastTime) {
            lastTime = now;
            return;
        }

        frames++;

        var delta = now - lastTime;

        if (delta > 2000) {
            var n = Math.floor(delta / 1000);

            for (var i = 0; i < n; i++) {
                lastFps.push(0);
            }

            fps = 0;
            lastTime += n * 1000;
            frames = 0;
            update();
        } else if (delta > 1000) {
            var fps = Math.round((frames * 1000) / (now - lastTime));
            lastFps.push(fps);
            lastTime = now;
            frames = 0;
            update();
        }
    }

    requestAnimationFrame(frame);

})();
