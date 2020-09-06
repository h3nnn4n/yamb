import {
    BoxGeometry,
    CircleGeometry,
    Mesh,
    PlaneGeometry,
    ShaderMaterial,
    ShaderMaterialParameters,
    Texture,
    TextureLoader,
    Vector2,
} from 'three';

// tslint:disable-next-line
const fragmentShader = require('../../shaders/mountain3d.fs')
// tslint:disable-next-line
const vertexShader = require('../../shaders/mountain3d.vs')
// tslint:disable-next-line
const texturePath = require('../../textures/colormap.png')

export class Mountain3D extends Mesh {

    private shaderMaterialParams: ShaderMaterialParameters;
    private startTime: number;
    private lastTime: number;

    constructor() {
        super();

        this.startTime = Date.now() / 1000.0;
        this.lastTime = this.startTime;

        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(texturePath);

        // material
        this.shaderMaterialParams = {
            fragmentShader,
            uniforms: {
                resolution: { type: 'v2', value: new Vector2() },
                tex: { type: 't', value: texture },
                time: { type: 'f', value: 1.0 },
            },
            vertexShader,
            wireframe: true,
        };
        this.material = new ShaderMaterial(this.shaderMaterialParams);

        // geometry
        this.geometry = new PlaneGeometry(500, 500, 100, 100);
        this.geometry.rotateX(-Math.PI / 2.0);
        // this.geometry.rotateY(20);
        // this.geometry = new BoxGeometry(1, 1, 1);
        // this.geometry = new CircleGeometry(1, 64);

        global.console.log(window.innerWidth);
        this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
        this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;
    }

    public update() {
        const now = Date.now() / 1000.0;
        const duration = now - this.lastTime;
        this.lastTime = now;
        this.geometry.rotateY(2 * Math.PI * duration * .01);
        this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
        this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;
        this.shaderMaterialParams.uniforms.time.value = Date.now() / 1000.0 - this.startTime;
    }
}
