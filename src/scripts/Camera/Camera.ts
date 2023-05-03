/**
 * Standard camera settings and controls
 */
export class Camera {
  constructor(scene: Phaser.Scene, bounds: Phaser.Geom.Rectangle) {
    scene.cameras.main.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
    scene.cameras.main.setZoom(0.25);
  }
}
