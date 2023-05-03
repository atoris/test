import { RegistryType } from '../Consts/Registry';
import { EntitiesProvider } from './EntitiesProvider';
import { WorldProvider } from './WorldProvider';

/**
 * parses the necessary configs and adds them to the register
 */
export class DataProvider {
  public entitiesProvider: EntitiesProvider;
  public worldProvider: WorldProvider;

  constructor(private _scene: Phaser.Scene) {
    var entities = this._scene.cache.json.get('config.entities');
    var world = this._scene.cache.json.get('config.world');

    this.entitiesProvider = new EntitiesProvider(entities);
    this.worldProvider = new WorldProvider(world);

    this._scene.registry.set(RegistryType.EntitiesProvider, this.entitiesProvider);
    this._scene.registry.set(RegistryType.WorldProvider, this.worldProvider);
  }
}
