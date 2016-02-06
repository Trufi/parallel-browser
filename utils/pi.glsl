#define ntp 25
#define eps 1e-17
#define NHX 16
#define MAX_ID 15000

precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texture;

float expm (float p, float ak) {
  int i, j;
  float p1, pt, r;
  float tp[ntp];
  int tp1 = 0;

  if (tp1 == 0) {
    tp1 = 1;
    tp[0] = 1.;

    for (int i = 1; i < ntp; i++) {
      tp[i] = 2. * tp[i-1];
    }
  }

  if (ak == 1.) return 0.;

  for (int i = 0; i < ntp; i++) {
    if (tp[i] > p) {
      pt = tp[i-1];
      p1 = p;
      r = 1.;

      for (int j = 1; j < ntp; j++){
        if (j > i) {
          break;
        }

        if (p1 >= pt){
          r = 16. * r;
          r = r - float(int(r / ak)) * ak;
          p1 = p1 - pt;
        }
        pt = 0.5 * pt;
        if (pt >= 1.){
          r = r * r;
          r = r - float(int(r / ak)) * ak;
        }
      }
      break;
    }
  }

  return r;
}

float series (int m, int id) {
  int k;
  float ak, p, s, t;

  s = 0.;

  for (int k = 0; k < MAX_ID; k++){
    if (k < id) {
      ak = float(8 * k + m);
      p = float(id - k);
      t = expm (p, ak);
      s = s + t / ak;
      s = s - float(int(s));
    } else if (k <= id + 100) {
      ak = float(8 * k + m);
      t = pow (16., float(id - k)) / ak;
      if (t < eps) break;
      s = s + t;
      s = s - float(int(s));
    } else {
      break;
    }
  }

  return s;
}

void main(void) {
  vec4 val = texture2D(u_texture, v_texture);
  int id = int(val.x);
  float pid, s1, s2, s3, s4;

  s1 = series (1, id);
  s2 = series (4, id);
  s3 = series (5, id);
  s4 = series (6, id);
  pid = 4. * s1 - 2. * s2 - s3 - s4;
  pid = pid - float(int(pid)) + 1.;

  float y = abs(pid);
  y = 16. * (y - floor(y));
  y = float(int(y));

  gl_FragColor = vec4(y, 0, 0, 0);
}
