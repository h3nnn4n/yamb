class Mandelbrot {
  public x_center = -0.5;
  public y_center = 0.0;

  public zoom = 2.0;

  public x_min = 0;
  public y_min = 0;

  public x_max = 0;
  public y_max = 0;

  constructor() {
    this.update_bounds();
  }

  public update_bounds() {
    this.x_min = this.x_center - this.zoom;
    this.x_max = this.x_center + this.zoom;

    this.y_min = this.y_center - this.zoom;
    this.y_max = this.y_center + this.zoom;
  }
}

export {
  Mandelbrot,
};
