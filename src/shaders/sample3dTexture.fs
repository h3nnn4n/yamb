uniform float time;
uniform sampler2D tex;
uniform vec2 resolution;

float _time;

varying vec2 v_texcoord;

void main()	{

    _time = time;

    gl_FragColor = vec4(vec3(texture2D(tex, v_texcoord)), 1.0);

}