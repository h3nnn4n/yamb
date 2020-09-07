import { Mandelbrot } from './mandelbrot';

class Ui {
  public mouse_x = 0;
  public mouse_y = 0;

  private mandelbrot: Mandelbrot;

  constructor(mandelbrot: Mandelbrot) {
    this.mandelbrot = mandelbrot;

    this.bind();
  }

  public bind() {
    $('#main-canvas').mousemove(
      (event: any) => {
        const canvas = event.target;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        this.mouse_x = (event.clientX - rect.left) * scaleX;
        this.mouse_y = (event.clientY - rect.top) * scaleY;

        this.update_ui();
      },
    );
  }

  private update_ui(): void {
    const mandel_coords = this.mandelbrot.mouse_to_mandelbrot(this.mouse_x, this.mouse_y);

    $('#mouse_real_value').val(mandel_coords.x);
    $('#mouse_imag_value').val(mandel_coords.y);
  }
}

export {
  Ui,
};
