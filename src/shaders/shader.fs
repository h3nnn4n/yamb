uniform float time;
uniform vec2 resolution;

const float x_center = -0.5;
const float y_center = 0.0;
const float zoom = 2.0;

const float er = 2.0;
const int bailout = 256;

float process_point(vec2 c) {
  vec2 z = vec2(0.0);
  vec2 zn = vec2(0.0);

  float er_squared = er * er;

  for (int i = 0; i < bailout; i++) {
    zn.x = z.x * z.x - z.y * z.y + c.x;
    zn.y = 2.0 * z.x * z.y + c.y;

    z = zn;

    if ( z.x * z.x + z.y * z.y > er_squared ) {
      return float(i) / float (bailout);
    }
  }

  return 0.0;
}

void main() {
  float x_min = x_center - zoom / 2.0;
  float x_max = x_center + zoom / 2.0;

  float y_min = y_center - zoom / 2.0;
  float y_max = y_center + zoom / 2.0;

  vec2 uv = gl_FragCoord.xy / resolution.xy;

  vec2 c = vec2(gl_FragCoord.xy);
  c.x = x_min + uv.x * (x_max - x_min);
  c.y = y_min + uv.y * (y_max - y_min);

  float a = process_point(c);

  gl_FragColor = vec4(a);
}
