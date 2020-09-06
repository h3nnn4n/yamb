import {
  AxesHelper,
  Camera,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
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
  private readonly renderer: WebGLRenderer;

  private lastTime: number = Date.now() / 1000.;

  constructor() {
    const geometry = new PlaneGeometry( 200, 200, 32 );
    const uniforms = {};
    const material =  new ShaderMaterial({
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      vertexShader: vertexShader,
    })

    this.mesh = new Mesh( geometry, material );

    this.scene = new Scene();
    this.scene.add(this.mesh);

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

    this.camera = new OrthographicCamera(-0.5, 0.5, -0.5, 0.5, 0.1, 5);

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
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }
}
