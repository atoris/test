import 'phaser';
import BootScene from './Scenes/BootScene';
import { GuiScene } from './Scenes/GuiScene';
import MainScene from './Scenes/MainScene';

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 360;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#aaa',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  render:{
    antialias: false,
		pixelArt: false
  },

  scene: [BootScene, GuiScene, MainScene],
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
