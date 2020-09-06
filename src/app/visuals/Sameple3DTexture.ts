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
const fragmentShader = require('../../shaders/sample3dTexture.fs')
// tslint:disable-next-line
const vertexShader = require('../../shaders/sample3dTexture.vs')
// tslint:disable-next-line
const texturePath = require('../../textures/colormap.png')

export class Sample3DTexture extends Mesh {

    private shaderMaterialParams: ShaderMaterialParameters;
    private startTime: number;

    constructor() {
        super();

        this.startTime = Date.now() / 1000.0;

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
            // wireframe: true,
        };
        this.material = new ShaderMaterial(this.shaderMaterialParams);

        // geometry
        this.geometry = new PlaneGeometry(300, 300, 50, 50);
        // this.geometry.rotateX(70);
        // this.geometry.rotateY(20);
        // this.geometry = new BoxGeometry(1, 1, 1);
        // this.geometry = new CircleGeometry(1, 64);

        global.console.log(window.innerWidth);
        this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
        this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;
    }

    public update() {
        this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
        this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;
        this.shaderMaterialParams.uniforms.time.value = Date.now() / 1000.0 - this.startTime;
    }
}
