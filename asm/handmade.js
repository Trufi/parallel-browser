window.ui.onSubmit(function(value) {
    timeStart();

    var str = '3.';

    var hx = '0123456789ABCDEF';

    for (var i = 0; i < value; i++) {
        str += hx[asm.main(i)] + ' ';

        window.ui.update({result: str, counter: i + 1});
    }

    window.ui.update({time: timeEnd(), equel: assert(str)});
});

var asm = (function(stdlib, foreign, buffer) {
    'use asm';

    var i32 = new stdlib.Int32Array(buffer);
    var imul = stdlib.Math.imul;
    var pow = stdlib.Math.pow;
    var abs = stdlib.Math.abs;

    function main(id) {
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

        return ~~y;
    }

    function series(m, id) {
        m = m |0;
        id = id |0;

        var k = 0;
        var ak = 0;
        var p = 0;
        var t1 = 0;

        var s = 0.0;
        var t2 = 0.0;
        var eps = 1.0e-17;

        for (k = 0; (k |0) < (id |0); k = k + 1 |0) {
            ak = imul(8, k) + m |0;
            p = id - k |0;
            t1 = expm(p, ak) |0;
            s = s - (+(~~s));
            s = s + (+(t1 |0)) / (+(ak |0));
        }

        for (k = id; (k |0) <= (id + 100 |0); k = k + 1 |0) {
            ak = imul(8, k) + m |0;
            t2 = +pow(16.0, +(id - k |0)) / +(ak |0);
            if (t2 < eps) {
                break;
            }
            s = s + t2;
            s = s - (+(~~s));
        }

        return +s;
    }

    function expm(p, ak) {
        p = p |0;
        ak = ak |0;

        var i = 0;
        var j = 0;
        var p1 = 0.0;
        var pt = 0.0;
        var r = 0;

        var ntp = 100; // 25 * 4
        var tp1 = 0;

        if ((tp1 |0) == 0) {
            tp1 = 1;
            i32[0] = 1;

            for (i = 4; (i |0) < (ntp |0); i = i + 4 |0) {
                i32[i >>2] = 2 * (i32[i - 4 >>2] |0);
            }
        }

        if ((ak |0) == 1) {
            return 0;
        }

        for (i = 0; (i |0) < (ntp |0); i = i + 4 |0) {
            if ((i32[i >>2] |0) > (p |0)) {
                break;
            }
        }

        pt = +(i32[i - 4 >>2] |0);
        p1 = +(p |0);
        r = 1;

        for (j = 1; (j |0) < ((i + 1) |0); j = j + 1 |0) {
            if (p1 >= pt) {
                r = 16 * r |0;
                r = r - imul(((r |0) / (ak |0) | 0), ak) |0;
                p1 = p1 - pt;
            }

            pt = 0.5 * pt;
            if (pt >= 1.0) {
                r = imul(r, r);
                r = r - imul(((r |0) / (ak |0) | 0), ak) |0;
            }
        }

        return r |0;
    }

    return {
        main: main
    };
})(window, null, new ArrayBuffer(65536));
