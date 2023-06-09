import { Entity } from '../Entities/Entity';
import { EntityFactory } from '../Entities/EntityFactory';
import { WorldEntities, WorldProvider } from '../Providers/WorldProvider';

/**
 * Creates entities from the world.json config in isometry
 */
export class Units {
  public entities: Entity[] = [];

  private _worldProvider: WorldProvider;
  private _entityFactory: EntityFactory;

  constructor(worldProvider: WorldProvider, entityFactory: EntityFactory) {
    this._worldProvider = worldProvider;
    this._entityFactory = entityFactory;
  }

  public create = (group: string): Entity[] => {
    const entities = this._worldProvider.get<WorldEntities[]>('entities');

    entities.forEach((entity) => {
      this.entities.push(this._entityFactory.create(entity.id, entity.position.x, entity.position.y, group));
    });

    return this.entities;
  };
}
