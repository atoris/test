/**
 * The GameOver window opens when the player runs out of lives
 */
export class GameOverView extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);

    const rect = this.scene.add.rectangle(0, 0, 640, 360, 0x000000).setOrigin(0);
    const text = this.scene.add.text(0, 0, 'Game Over', { fontSize: 50 }).setOrigin(0.5).setPosition(320, 180);
    this.add([rect, text]);

    this.scene.add.container(0, 0, this);
  }
}
