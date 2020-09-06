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
const fragmentShader = require('../shaders/shader.frag')
// tslint:disable-next-line
const vertexShader = require('../shaders/shader.vert')

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
      x_center: { value: -0.5 },
      y_center: { value: 0.0 },
      zoom: { value: 2.0 },

      x_max: { value: 0.0 },
      x_min: { value: 0.0 },

      y_max: { value: 0.0 },
      y_min: { value: 0.0 },

      bailout: { value: 256 },
      er: { value: 2.0 },
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

    const x_center = this.uniforms.x_center.value;
    const y_center = this.uniforms.y_center.value;
    const zoom = this.uniforms.zoom.value;

    this.uniforms.x_min.value = x_center - zoom;
    this.uniforms.x_max.value = x_center + zoom;

    this.uniforms.y_min.value = y_center - zoom;
    this.uniforms.y_max.value = y_center + zoom;
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }
}
