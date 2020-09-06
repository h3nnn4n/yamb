uniform float time;
uniform vec2 resolution;

uniform float x_center;
uniform float y_center;
uniform float zoom;

uniform float x_min;
uniform float x_max;

uniform float y_min;
uniform float y_max;

uniform vec2 uv_offset;

uniform float er;
uniform int bailout;

const int max_bailout = 50000;

float process_point(vec2 c) {
  vec2 z = vec2(0.0);
  vec2 zn = vec2(0.0);

  float er_squared = er * er;

  for (int i = 0; i < max_bailout; i++) {
    if (i > bailout)
      break;

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
  vec2 uv_square = gl_FragCoord.xy / max(resolution.x, resolution.y);
  uv_square += uv_offset;

  vec2 c = vec2(gl_FragCoord.xy);
  c.x = x_min + uv_square.x * (x_max - x_min);
  c.y = y_min + uv_square.y * (y_max - y_min);

  float a = process_point(c);

  gl_FragColor = vec4(a);
}
