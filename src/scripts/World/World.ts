import { Scene, GameObjects } from 'phaser';
import { Camera } from '../Camera/Camera';
import { RegistryType } from '../Consts/Registry';
import { Entity } from '../Entities/Entity';
import { EntityFactory } from '../Entities/EntityFactory';
import { WorldProvider } from '../Providers/WorldProvider';
import { Grid } from './Grid';
import { Ground } from './Ground';
import { Units } from './Units';

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
    this.entityFactory.on('create', this.onCreateEntity, this)
    
    this.create().then((res) => {
      const camera = new Camera(this._scene, this.container.getBounds());

      this.grid.createMatrix(res);
    });

    
  }

  private onCreateEntity(entity:Entity){
    this.container.add(entity);
    this.enities.get(entity.group)?.add(entity);
  }

  public removeEntity(entity: Entity) {
    const group = this.enities.get(entity.group);
    group?.remove(entity, true, true);
    this.container.remove(entity, true);
  }

  private create(): Promise<Entity[][]> {
    this.ground = new Ground(this._worldProvider, this.entityFactory);
    this.units = new Units(this._worldProvider, this.entityFactory);

    return Promise.all([
      this.createEntities('ground', this.ground.create, false),
      this.createEntities('units', this.units.create, true),
    ]).then((res) => res);
  }

  private createEntities(id: string, func: (group: string) => Promise<Entity[]>, runChildUpdate: boolean = true) {
    return func(id).then((res) => {
      const group = this._scene.add.group(res, { runChildUpdate: runChildUpdate });
      this.enities.set(id, group);

      return res;
    });
  }
}
