import { EntitySchema } from '../Providers/EntitiesProvider';
import { Position } from '../Providers/WorldProvider';
import IsoUtils from '../Utils/IsoUtils';
import { Behaviour } from './Behaviors/Behaviour';
import { BehaviourService } from './Behaviors/BehaviourService';
import { IBehaviourData } from '../Interfaces/Behaviour/IBehaviourData';
import { World } from '../World/World';
import { IDisposable } from '../Interfaces/IDisposable';

export class Entity extends Phaser.GameObjects.Container implements IDisposable {
  public isoPosition: Position;
  public entityData: EntitySchema;
  public behaviorService: BehaviourService;
  public world: World;
  public group: string;

  public create(entityData: EntitySchema, isoX: number, isoY: number, world: World, group: string) {
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

  public addBehavior(id: string, data: IBehaviourData, extra?: any): Behaviour<IBehaviourData> {
    return this.behaviorService.addBehavior(id, data, extra);
  }

  public hasBehaviour(type: string): boolean {
    return this.behaviorService.hasBehaviour(type);
  }

  public getBehavior(type: string): Behaviour<IBehaviourData> | undefined {
    return this.behaviorService.getBehavior(type);
  }
  public removeBehavior(behavior: Behaviour<IBehaviourData>): Entity {
    return this.behaviorService.removeBehavior(behavior);
  }

  public dispose(): void {
    this.behaviorService.dispose();
    this.world.removeEntity(this);
  }
}
