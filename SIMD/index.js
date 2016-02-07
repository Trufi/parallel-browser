var a = SIMD.Float32x4(1, 2, 3, 4);
var b = SIMD.Float32x4(5, 6, 7, 8);
var c = SIMD.Float32x4.add(a, b);

var ta = new Float32Array(4);
SIMD.Float32x4.store(ta, 0, c);
console.log(ta);
