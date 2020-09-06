import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';

export class EasyOrbitControls extends OrbitControls {

    constructor(object: THREE.Camera, domElement?: HTMLElement, domWindow?: Window) {
        // controls
        super(object, domElement, domWindow);
    }

    public easySetUp() {
        // How far you can orbit vertically, upper and lower limits.
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;

        // How far you can dolly in and out ( PerspectiveCamera only )
        this.minDistance = 0;
        this.maxDistance = Infinity;

        this.enableZoom = true; // Set to false to disable zooming
        this.zoomSpeed = 0.7;

        this.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

        this.enableDamping = true; // Set to false to disable damping (ie inertia)
        this.dampingFactor = 0.25;
    }

}
