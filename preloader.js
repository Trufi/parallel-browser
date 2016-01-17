var elementCanvas = document.querySelector('#preloader');
var ctx = elementCanvas.getContext('2d');
var size = [elementCanvas.width, elementCanvas.height];
var center = [size[0] / 2, size[1] / 2];
var radius = 100;
var angle = 0;

ctx.lineWidth = 10;

function render() {
    requestAnimationFrame(render);

    angle = angle + 0.01;

    ctx.clearRect(0, 0, size[0], size[1]);

    for (var i = 0; i < 3; i++) {
        var radius = (i + 1) * 30 + 20;
        var sign = i % 2 == 0 ? -1 : 1;

        var c = 1;

        if (i == 0) {
            c = 2;
        }

        ctx.beginPath();
        ctx.arc(center[0], center[1], radius, sign * angle * c, sign * angle * c + 2 * Math.PI - angle / 2, false);
        ctx.stroke();
    }
}

requestAnimationFrame(render);
