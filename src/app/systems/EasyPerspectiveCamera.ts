import {
    PerspectiveCamera,
    Vector3,
} from 'three';

export class EasyPerspectiveCamera extends PerspectiveCamera {
    constructor(fov?: number, aspect?: number, near?: number, far?: number) {
        // camera
        super(fov, aspect, near, far);
    }

    public easySetUp() {
        this.fov = 45;
        this.aspect = innerWidth / innerHeight;
        this.near = 1;
        this.far = 10000;
        this.position.set(200, 300, 500);
        this.lookAt(new Vector3(0, 0, 0));
    }
}
