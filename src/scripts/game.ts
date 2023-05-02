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
		antialiasGL: true,
		mipmapFilter: 'LINEAR', // 'NEAREST', 'LINEAR', 'NEAREST_MIPMAP_NEAREST', 'LINEAR_MIPMAP_NEAREST', 'NEAREST_MIPMAP_LINEAR', 'LINEAR_MIPMAP_LINEAR'
		pixelArt: false,
		roundPixels: false,
		transparent: false,
		clearBeforeRender: true,
		premultipliedAlpha: true,
		failIfMajorPerformanceCaveat: false,
		powerPreference: 'default', // 'high-performance', 'low-power' or 'default'
		batchSize: 4096,
		desynchronized: false,
  },

  scene: [BootScene, GuiScene, MainScene],
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
