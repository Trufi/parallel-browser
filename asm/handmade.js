window.ui.onSubmit(function(value) {
    timeStart();

    var str = '3.';

    var heap = new ArrayBuffer(65536);
    var i32 = new Int32Array(heap);

    var main = asm(window, null, heap).main;

    var hx = '0123456789ABCDEF';

    main(value);

    for (var i = 0; i < value; i++) {
        str += hx[i32[500 + i]] + ' ';
    }

    window.ui.update({time: timeEnd(), equel: assert(str), result: str, counter: i});
});

var asm = function(stdlib, foreign, heap) {
    'use asm';

    var f64 = new stdlib.Float64Array(heap);
    var i32 = new stdlib.Int32Array(heap);
    var pow = stdlib.Math.pow;
    var abs = stdlib.Math.abs;
    var floor = stdlib.Math.floor;

    var eps = 1.0e-17;
    var tp1 = 0;
    var ntp = 25;
    var intOffset = 500;

    function main(len) {
        len = len |0;

        var i = 0;

        for (i = 0; (i |0) < (len |0); i = i + 1 |0) {
            i32[intOffset + i << 2 >>2] = pi(i) |0;
        }
    }

    function pi(id) {
        id = id |0;

        var pid = 0.0;
        var s1 = 0.0;
        var s2 = 0.0;
        var s3 = 0.0;
        var s4 = 0.0;
        var y = 0.0;

        s1 = +series(1, id);
        s2 = +series(4, id);
        s3 = +series(5, id);
        s4 = +series(6, id);
        pid = 4.0 * s1 - 2.0 * s2 - s3 - s4;
        pid = pid - (+(~~pid)) + 1.0;

        y = abs(pid);
        y = 16.0 * (y - (+(~~y)));

        return ~~y |0;
    }

    function series(ma, id) {
        ma = ma |0;
        id = id |0;

        var k = 0;
        var ak = 0.0;
        var p = 0.0;
        var m = 0.0;

        var s = 0.0;
        var t = 0.0;

        m = +(ma |0);

        for (k; (k |0) < (id |0); k = k + 1 |0) {
            ak = 8.0 * (+(k |0)) + m;
            p = +(id - k |0);
            t = +expm(p, ak);
            s = s - (+(~~s));
            s = s + t / ak;
        }

        for (k = id; (k |0) <= (id + 100 |0); k = k + 1 |0) {
            ak = 8.0 * (+(k |0)) + m;
            t = +pow(16.0, +(id - k |0)) / ak;
            if (t < eps) {
                break;
            }
            s = s + t;
            s = s - (+(~~s));
        }

        return +s;
    }

    function expm(p, ak) {
        p = +p;
        ak = +ak;

        var i = 0;
        var j = 0;

        var p1 = 0.0;
        var pt = 0.0;
        var r = 0.0;

        if ((tp1 |0) == 0) {
            tp1 = 1;
            f64[0] = 1.0;

            for (i = 1; (i |0) < (ntp |0); i = i + 1 |0) {
                f64[i << 3 >>3] = 2.0 * (+(f64[(i - 1) << 3 >>3]));
            }
        }

        if (ak == 1.0) {
            return +0.0;
        }

        for (i = 0; (i |0) < (ntp |0); i = i + 1 |0) {
            if (+f64[i << 3 >>3] > p) {
                break;
            }
        }

        pt = +(f64[(i - 1) << 3 >>3]);
        p1 = p;
        r = 1.0;

        for (j = 1; (j |0) <= (i |0); j = j + 1 |0) {
            if (p1 >= pt) {
                r = 16.0 * r;
                r = r - (+(~~(r / ak))) * ak;
                p1 = p1 - pt;
            }

            pt = 0.5 * pt;
            if (pt >= 1.0) {
                r = r * r;
                r = r - (+(~~(r / ak))) * ak;
            }
        }

        return +r;
    }

    return {
        main: main
    };
};
