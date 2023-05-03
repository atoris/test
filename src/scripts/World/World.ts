import { Scene, GameObjects } from 'phaser';
import { EventsType } from '../Consts/Events';
import { GroupsTypes } from '../Consts/Groups';
import { RegistryType } from '../Consts/Registry';
import { Entity } from '../Entities/Entity';
import { EntityFactory } from '../Entities/EntityFactory';
import { WorldProvider } from '../Providers/WorldProvider';
import { Grid } from './Grid';
import { Ground } from './Ground';
import { Units } from './Units';

/**
 * The world of the game, adds all the necessary entities to the scene
 */
export class World {
  public units: Units;
  public ground: Ground;
  public container: GameObjects.Container;
  public grid: Grid;
  public entityFactory: EntityFactory;
  public enities: Map<string, Phaser.GameObjects.Group> = new Map();

  private _scene: Scene;
  private _worldProvider: WorldProvider;

  constructor(scene: Scene) {
    this._scene = scene;
    this.container = this._scene.add.container();
    this._worldProvider = this._scene.registry.get(RegistryType.WorldProvider);
    this.grid = new Grid();
    this.entityFactory = new EntityFactory(this._scene, this);
    this.entityFactory.on(EventsType.createentity, this.onCreateEntity, this);

    const entities = this.create();
    this.grid.createMatrix(entities);
  }

  private onCreateEntity(entity: Entity): void {
    this.container.add(entity);
    this.enities.get(entity.group)?.add(entity);
  }

  public removeEntity(entity: Entity): void {
    const group = this.enities.get(entity.group);
    group?.remove(entity, true, true);
    this.container.remove(entity, true);
  }

  private create(): Entity[][] {
    this.ground = new Ground(this._worldProvider, this.entityFactory);
    this.units = new Units(this._worldProvider, this.entityFactory);
    return [
      this.createEntities(GroupsTypes.ground, this.ground.create, false),
      this.createEntities(GroupsTypes.units, this.units.create, true),
    ];
  }

  private createEntities(id: string, func: (group: string) => Entity[], runChildUpdate: boolean = true): Entity[] {
    const entities = func(id);
    const group = this._scene.add.group(entities, { runChildUpdate: runChildUpdate });
    this.enities.set(id, group);

    return entities;
  }
}
