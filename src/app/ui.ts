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
        this.mouse_y = canvas.height - this.mouse_y;

        this.update_mouse_ui();
      },
    );

    $('#main-canvas').click(
      (event: any) => {
        this.mandelbrot.set_new_coordinates_from_mouse(this.mouse_x, this.mouse_y);
        this.update_ui();
      },
    );

    $('#real_value').change(() => this.update_mandelbrot_coordinates());
    $('#imag_value').change(() => this.update_mandelbrot_coordinates());
    $('#zoom_level').change(() => this.update_mandelbrot_zoom());
  }

  public update_ui(): void {
    $('#real_value').val(this.mandelbrot.x_center);
    $('#imag_value').val(this.mandelbrot.y_center);
  }

  private update_mandelbrot_zoom() {
    this.mandelbrot.set_zoom($('#zoom_level').val() as number);
  }

  private update_mandelbrot_coordinates() {
    this.mandelbrot.set_new_coordinates(
      $('#real_value').val() as number,
      $('#imag_value').val() as number,
    );
  }

  private update_mouse_ui(): void {
    const mandel_coords = this.mandelbrot.mouse_to_mandelbrot(this.mouse_x,
                                                              this.mouse_y);

    $('#mouse_real_value').val(mandel_coords.x);
    $('#mouse_imag_value').val(mandel_coords.y);
  }
}

export {
  Ui,
};
