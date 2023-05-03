import { Camera } from '../Camera/Camera';
import { DataProvider } from '../Providers/DataProvider';
import { World } from '../World/World';

/**
 * The game scene for the game world
 */
export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  protected create(): void {
    new DataProvider(this);

    const world = new World(this);

    new Camera(this, world.container.getBounds());
  }
}
