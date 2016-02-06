var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');

elementButton.addEventListener('click', function() {
    var counter = document.createElement('div');
    document.body.appendChild(counter);

    var text = document.createElement('div');
    document.body.appendChild(text);

    timeStart();

    var str = '3.';

    for (var i = 0; i < parseInt(elementNumber.value, 10); i++) {
        str += String(calc(i)).slice(0, 1) + ' ';
        text.innerHTML = str;
        counter.innerHTML = i + 1;
    }

    console.log(timeEnd());
    console.log(assert(str));
});
