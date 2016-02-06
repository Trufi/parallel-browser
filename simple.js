var elementButton = document.querySelector('#button');
var elementNumber = document.querySelector('#number');

elementButton.addEventListener('click', function() {
    var counter = document.createElement('div');
    document.body.appendChild(counter);

    var text = document.createElement('div');
    document.body.appendChild(text);
    text.innerHTML = '3.';

    timeStart();

    for (var i = 0; i < parseInt(elementNumber.value, 10); i++) {
        text.innerHTML += String(calc(i)).slice(0, 1) + ' ';
        counter.innerHTML = i;
    }

    console.log(timeEnd());
});
