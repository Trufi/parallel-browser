(function() {
    var elementButton = document.querySelector('#button');
    var elementNumber = document.querySelector('#number');
    var elementCounter = document.querySelector('#elementCounter');
    var elementResult = document.querySelector('#elementResult');
    var elementTime = document.querySelector('#elementTime');
    var elementAssert = document.querySelector('#elementAssert');

    var onSubmitFunction = null;

    window.ui = {
        update: function(data) {
            if ('result' in data) {
                elementResult.innerHTML = data.result;
            }

            if ('counter' in data) {
                elementCounter.innerHTML = 'Count: ' + data.counter;
            }

            if ('time' in data) {
                elementTime.innerHTML = 'Time: ' + data.time + 'ms';
            }

            if ('equel' in data) {
                elementAssert.innerHTML = 'Equel: ' + data.equel;
            }
        },

        reset: function() {
            elementResult.innerHTML = '';
            elementCounter.innerHTML = 'Count: ?';
            elementTime.innerHTML = 'Time: ?';
            elementAssert.innerHTML = 'Equel: ?';
        },

        onSubmit: function(fn) {
            onSubmitFunction = fn;
        }
    };

    elementButton.addEventListener('click', submit);
    elementNumber.addEventListener('keypress', function(ev) {
        if (ev.which == 13) {
            submit();
        }
    });

    function submit() {
        var value = parseInt(elementNumber.value, 10);

        if (value && onSubmitFunction) {
            window.ui.reset();
            onSubmitFunction(value);
        }
    }

})();
