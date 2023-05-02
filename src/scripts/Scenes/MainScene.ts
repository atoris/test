import { DataProvider } from '../Providers/DataProvider';
import { World } from '../World/World';
export default class MainScene extends Phaser.Scene {
  private _world: World;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    new DataProvider(this);
    this._world = new World(this);
  }

}
