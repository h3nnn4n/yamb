class Mandelbrot {
  public x_center = -0.5;
  public y_center = 0.0;

  public zoom = 2.0;

  public x_min = 0;
  public y_min = 0;

  public x_max = 0;
  public y_max = 0;

  private canvas: HTMLCanvasElement;

  constructor() {
    this.update_bounds();

    this.canvas = $('#main-canvas')[0] as HTMLCanvasElement;
  }

  public update_bounds() {
    this.x_min = this.x_center - this.zoom;
    this.x_max = this.x_center + this.zoom;

    this.y_min = this.y_center - this.zoom;
    this.y_max = this.y_center + this.zoom;
  }

  public set_zoom(zoom: number) {
    this.zoom = zoom;

    this.update_bounds();
  }

  public set_new_coordinates(real: number, imag: number) {
    this.x_center = real;
    this.y_center = imag;

    this.update_bounds();
  }

  public set_new_coordinates_from_mouse(mouse_x: number, mouse_y: number) {
    const new_coords = this.mouse_to_mandelbrot(mouse_x, mouse_y);

    this.x_center = new_coords.x;
    this.y_center = new_coords.y;

    this.update_bounds();
  }

  public mouse_to_mandelbrot(mouse_x: number, mouse_y: number): any {
    const x = this.x_min + (this.x_max - this.x_min) * (mouse_x / this.canvas.width);
    const y = this.y_min + (this.y_max - this.y_min) * (mouse_y / this.canvas.height);

    return {
      x,
      y,
    };
  }
}

export {
  Mandelbrot,
};
