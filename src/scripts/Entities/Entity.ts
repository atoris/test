import { EntitySchema } from '../Providers/EntitiesProvider';
import { Position } from '../Providers/WorldProvider';
import IsoUtils from '../Utils/IsoUtils';
import { Behaviour } from './Behaviors/Behaviour';
import { BehaviourService } from './Behaviors/BehaviourService';
import { IBehaviourData } from '../Interfaces/Behaviour/IBehaviourData';
import { World } from '../World/World';
import { IDisposable } from '../Interfaces/IDisposable';

/**
 * Entity Description
 * An Entity is essentially an entity (unit) that is created on the map
 */
export class Entity extends Phaser.GameObjects.Container implements IDisposable {
  public isoPosition: Position;
  public entityData: EntitySchema;
  public behaviorService: BehaviourService;
  public world: World;
  public group: string;

  /**
   * creating a unit on the map, appearance, position on the map
   * @param entityData config from entity.json file for this entity
   * @param isoX isometric position on the map x
   * @param isoY isometric position on map by y
   * @param world game world
   * @param group group the entity belongs to
   */
  public create(entityData: EntitySchema, isoX: number, isoY: number, world: World, group: string): void {
    this.entityData = entityData;
    this.behaviorService = new BehaviourService(this);
    this.isoPosition = { x: isoX, y: isoY };
    this.world = world;
    this.group = group;

    const worldPos = IsoUtils.toWorld(isoX, isoY, true);

    const tile = this.scene.add.image(0, 0, 'tiles', entityData.id);
    this.setPosition(worldPos.x, worldPos.y + IsoUtils.tileHeight);
    this.add(tile);
  }

  /**
   * @see BehaviourService#addBehavior
   */
  public addBehavior(name: string, data: IBehaviourData, extra?: any): Behaviour<IBehaviourData> {
    return this.behaviorService.addBehavior(name, data, extra);
  }

  /**
   * @see BehaviourService#hasBehaviour
   */
  public hasBehaviour(name: string): boolean {
    return this.behaviorService.hasBehaviour(name);
  }

  public dispose(): void {
    this.behaviorService.dispose();
    this.world.removeEntity(this);
  }
}
