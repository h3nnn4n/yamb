uniform float time;
uniform sampler2D tex;
uniform vec2 resolution;

float _time;

varying vec2 v_texcoord;
varying vec4 v_position;

void main()	{

    _time = time;

    float height = (v_position.y + 100.) / 200.;
    gl_FragColor = vec4(vec3(texture2D(tex, v_texcoord)), 1.0 * height);

}