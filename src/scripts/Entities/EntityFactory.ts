import { EventsType } from '../Consts/Events';
import { RegistryType } from '../Consts/Registry';
import { EntitiesProvider, EntitySchema } from '../Providers/EntitiesProvider';
import { World } from '../World/World';
import { Entity } from './Entity';

/**
 * Entity Factory
 */
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

  /**
   * creates an entity and adds behavior
   * @param id id from the entities config
   * @param x search by x
   * @param y search by y
   * @param group group
   * @param extra data
   * @returns
   */
  public create(id: string, x: number, y: number, group: string, extra?: any): Entity {
    const entity = new Entity(this._scene);
    const entityData = this._entitiesProvider.get<EntitySchema>(id);
    entity.create(entityData, x, y, this._world, group);

    if (entity.entityData.behaviours) {
      for (let i = 0; i < entity.entityData.behaviours.length; i++) {
        const behaviour = entity.entityData.behaviours[i];
        entity.addBehavior(behaviour.id, behaviour.data, extra);
      }
    }

    this.emit(EventsType.createentity, entity);

    return entity;
  }
}
