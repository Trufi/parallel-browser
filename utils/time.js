var time;

if (performance && performance.now) {
    time = performance.now.bind(performance);
} else {
    time = Date.now.bind(Date);
}

var startTime = 0;

window.timeStart = function() {
    startTime = time();
};

window.timeEnd = function() {
    return time() - startTime;
};
