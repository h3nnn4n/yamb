uniform float time;
uniform vec2 resolution;

varying vec2 v_texcoord;
varying vec4 v_position;

void main()	{
    // texcoord
    v_texcoord = uv;
    // position
    vec3 pos = position;
    pos.y = 100. * sin((pos.x * pos.z) * time * 0.0001);
    // pos.y = pos.y + 100. * sin((pos.x) * time * 0.01);
    v_position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_Position = v_position;
}