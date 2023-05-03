import { EventsType } from '../../Consts/Events';
import { GroupsTypes } from '../../Consts/Groups';
import { IExplosionBehaviourData } from '../../Interfaces/Behaviour/IExplosionBehaviourData';
import { LeeSearch } from '../../World/LeeSearch';
import { Behaviour } from './Behaviour';

/**
 * Explosion behavior
 * define a kill zone in an explosion, taking into account barriers
 * create an entity of fire on the cells in the kill zone
 */
export class ExplosionBehaviour extends Behaviour<IExplosionBehaviourData> {
  public init(): void {
    this.entity.scene.game.events.on(EventsType.explosion, this.onExplosion, this);
  }

  private onExplosion() {
    const matrix = this.entity.world.grid.matrix;
    const leeSearch = new LeeSearch();

    const path = leeSearch.floodFill(matrix, this.entity.isoPosition, this.data.range);

    let isPath: boolean = false;

    for (let x = 0; x < path.length; x++) {
      for (let y = 0; y < path[x].length; y++) {
        if (path[x][y] == 0) {
          isPath = true;
          this.createEntity(x, y);
        }
      }
    }

    if (!isPath) {
      this.createEntity(this.entity.isoPosition.x, this.entity.isoPosition.y);
    }
  }

  private createEntity(x: number, y: number): void {
    this.entity.world.entityFactory.create(EventsType.fire, x, y, GroupsTypes.units).once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.entity.world.container.scene.game.events.emit(EventsType.explosioncomplete, {
          position: { x: x, y: y },
          damage: this.data.damage,
        });
      },
      this
    );
  }

  public dispose(): void {
    this.entity.scene.game.events.off(EventsType.explosion, this.onExplosion, this);
  }
}
