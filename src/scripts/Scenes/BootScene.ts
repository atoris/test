export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  protected preload() {
    this.load.pack('preload', './assets/pack.json');
  }

  protected create() {
    this.scene.start('GuiScene');
    this.scene.start('MainScene');

    this.game.scene.bringToTop('GuiScene');
  }
}
