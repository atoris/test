import { RegistryType } from '../Consts/Registry';
import { EntitiesProvider, EntitySchema } from '../Providers/EntitiesProvider';
import { World } from '../World/World';
import { Entity } from './Entity';

export class EntityFactory extends Phaser.Events.EventEmitter {
  private _entitiesProvider: EntitiesProvider;
  private _world: World;
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, world: World) {
    super();

    this._scene = scene;
    this._world = world;

    this._entitiesProvider = this._scene.registry.get(RegistryType.EntitiesProvider);
  }

  public create(id: string, x: number, y: number, group: string, data?: any): Entity {
    const entity = new Entity(this._scene);
    const entityData = this._entitiesProvider.get<EntitySchema>(id);
    entity.create(entityData, x, y, this._world, group);

    if (entity.entityData.behaviours) {
      for (let i = 0; i < entity.entityData.behaviours.length; i++) {
        const behaviour = entity.entityData.behaviours[i];
        entity.addBehavior(behaviour.id, behaviour.data, data);
      }
    }

    this.emit('create', entity);

    return entity;
  }
}
