import {
  Camera,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';

// tslint:disable-next-line
const fragmentShader = require('../shaders/shader.fs')
// tslint:disable-next-line
const vertexShader = require('../shaders/shader.vs')

export class App {
  private readonly scene: Scene;
  private camera: Camera;
  private mesh: Mesh;
  private uniforms: any;
  private canvas: HTMLCanvasElement;
  private readonly renderer: WebGLRenderer;

  private lastTime: number = Date.now() / 1000.;

  constructor() {
    const geometry = new PlaneGeometry(2, 2);
    this.uniforms = {
      resolution:  { value: new Vector3() },
      time: { value: 0 },
    };

    const material =  new ShaderMaterial({
      fragmentShader,
      uniforms: this.uniforms,
      vertexShader,
    });

    this.mesh = new Mesh( geometry, material );

    this.scene = new Scene();
    this.scene.add(this.mesh);
    this.canvas = document.getElementById('main-canvas') as HTMLCanvasElement;

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

    this.camera = new OrthographicCamera(-1, 1,
                                         -1, 1,
                                         -1, 1);

    this.adjustCanvasSize();
    this.render();
  }

  private render() {
    this.update();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => { this.render(); });

    this.adjustCanvasSize();
  }

  private update() {
    const now = Date.now() / 1000.0;
    this.lastTime = now;

    this.uniforms.resolution.value.set(this.canvas.width, this.canvas.height, 1);
    this.uniforms.time.value = now;
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }
}
