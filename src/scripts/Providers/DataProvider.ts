import { RegistryType } from '../Consts/Registry';
import { EntitiesProvider } from './EntitiesProvider';
import { WeaponsProvider } from './WeaponsProvider';
import { WorldProvider } from './WorldProvider';

export class DataProvider {
  public entitiesProvider: EntitiesProvider;
  public weaponsProvider: WeaponsProvider;
  public worldProvider: WorldProvider;

  constructor(private _scene: Phaser.Scene) {
    var entities = this._scene.cache.json.get('config.entities');
    var weapons = this._scene.cache.json.get('config.weapons');
    var world = this._scene.cache.json.get('config.world');

    this.entitiesProvider = new EntitiesProvider(entities);
    this.weaponsProvider = new WeaponsProvider(weapons);
    this.worldProvider = new WorldProvider(world);

    this._scene.registry.set(RegistryType.EntitiesProvider, this.entitiesProvider);
    this._scene.registry.set(RegistryType.WeaponsProvider, this.weaponsProvider);
    this._scene.registry.set(RegistryType.WorldProvider, this.worldProvider);
  }
}
