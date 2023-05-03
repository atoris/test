import { Entity } from '../Entities/Entity';
import { EntityFactory } from '../Entities/EntityFactory';
import { Size, WorldProvider } from '../Providers/WorldProvider';
import IsoUtils from '../Utils/IsoUtils';

/**
 * Creates isometric land tiles
 */
export class Ground {
  public entities: Entity[] = [];
  private _worldProvider: WorldProvider;
  private _entityFactory: EntityFactory;

  constructor(worldProvider: WorldProvider, entityFactory: EntityFactory) {
    this._worldProvider = worldProvider;
    this._entityFactory = entityFactory;
  }

  public create = (group: string): Entity[] => {
    const world = this._worldProvider.get<Size>('world');

    const top = IsoUtils.toWorld(0, 0);
    var center = IsoUtils.toWorld(world.width / 2, world.height / 2);

    const width = IsoUtils.tileWidth * world.width;
    const height = IsoUtils.tileHeight * world.height;

    var deltaX = Math.floor(width / 2);
    var deltaY = Math.floor(center.y - top.y - height / 2);

    IsoUtils.setDelta(deltaX, deltaY);

    for (let y = 0; y < world.height; y++) {
      for (let x = 0; x < world.width; x++) {
        this.entities.push(this._entityFactory.create('floor', x, y, group));
      }
    }

    return this.entities;
  };
}
