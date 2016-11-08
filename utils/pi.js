function pi(id) {
    var pid, s1, s2, s3, s4;
    s1 = series(1, id);
    s2 = series(4, id);
    s3 = series(5, id);
    s4 = series(6, id);
    pid = 4 * s1 - 2 * s2 - s3 - s4;
    pid = pid - (pid | 0) + 1;

    var NHX = 16;
    //var chx = new Array([NHX]);
    //ihex(pid, NHX, chx);

    // function ihex(x, nhx, chx) {
    //     var i, y;
    //     var hx = '0123456789ABCDEF';
    //
    //     y = Math.abs(x);
    //     // y = 16 * (y - Math.floor(y));
    //     // chx[0] = hx[floor(y)];
    //
    //     for (i = 0; i < nhx; i++){
    //         y = 16 * (y - Math.floor(y));
    //         chx[i] = hx[floor(y)];
    //     }
    // }

    function series(m, id) {
        var k, ak, p, s, t;
        var eps = Number.EPSILON;//1e-17;
        s = 0;

        for (k = 0; k < id; k++) {
            ak = 8 * k + m;
            p = id - k;
            t = expm(p, ak);
            s = s - (s | 0);
            s = s + t / ak;
        }

        for (k = id; k <= id + 100; k++) {
            ak = 8 * k + m;
            t = Math.pow(16, (id - k)) / ak;
            if (t < eps) {
                break;
            }
            s = s + t;
            s = s - (s|0);
        }

        return s;
    }

    function expm(p, ak) {
        var i, j, p1, pt, r;
        var ntp = 25;
        var tp1 = 0;
        var tp = new Array(ntp);

        if (tp1 == 0) {
            tp1 = 1;
            tp[0] = 1;

            for (i = 1; i < ntp; i++) {
                tp[i] = 2 * tp[i - 1];
            }
        }


        if (ak == 1) {
            return 0;
        }

        for (i = 0; i < ntp; i++) {
            if (tp[i] > p) {
                break;
            }
        }

        pt = tp[i - 1];
        p1 = p;
        r = 1;

        for (j = 1; j <= i; j++) {
            if (p1 >= pt) {
                r = 16 * r;
                r = r - (r / ak | 0) * ak;
                p1 = p1 - pt;
            }

            pt = 0.5 * pt;
            if (pt >= 1) {
                r = r * r;
                r = r - (r / ak | 0) * ak;
            }
        }
        return r;
    }

    var hx = '0123456789ABCDEF';
    y = Math.abs(pid);
    y = 16 * (y - (y | 0));

    return hx[y | 0];
}
