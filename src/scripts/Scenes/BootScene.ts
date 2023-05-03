/**
 * Scene for downloading assets and inits of other scenes
 */
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  protected preload(): void {
    this.load.pack('preload', './assets/pack.json');
  }

  protected create(): void {
    this.scene.start('GuiScene');
    this.scene.start('MainScene');

    this.game.scene.bringToTop('GuiScene');
  }
}
