import 'bootstrap';

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

import { Mandelbrot } from './mandelbrot';

import '../style/main.scss';

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
  private mandelbrot: Mandelbrot;
  private readonly renderer: WebGLRenderer;

  private lastTime: number = Date.now() / 1000.;

  constructor() {
    this.mandelbrot = new Mandelbrot();

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
    this.adjustCanvasSize();
    this.update();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => { this.render(); });
  }

  private update() {
    const now = Date.now() / 1000.0;
    this.lastTime = now;

    this.uniforms.time.value = now;
    this.uniforms.resolution.value.set(this.canvas.width,
                                       this.canvas.height,
                                       1);

    this.uniforms.x_center.value = this.mandelbrot.x_center;
    this.uniforms.y_center.value = this.mandelbrot.y_center;
    this.uniforms.zoom.value = this.mandelbrot.zoom;

    this.uniforms.x_min.value = this.mandelbrot.x_min;
    this.uniforms.x_max.value = this.mandelbrot.x_max;

    this.uniforms.y_min.value = this.mandelbrot.y_min;
    this.uniforms.y_max.value = this.mandelbrot.y_max;
  }

  private adjustCanvasSize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.renderer.setSize(width, height, true);
    }
  }
}
