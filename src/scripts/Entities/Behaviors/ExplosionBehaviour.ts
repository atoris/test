import { IExplosionBehaviourData } from '../../Interfaces/Behaviour/IExplosionBehaviourData';
import { IExplosionEvent } from '../../Interfaces/Events/IExplosionEvent';
import { LeeSearch } from '../../World/LeeSearch';
import { Behaviour } from './Behaviour';

export class ExplosionBehaviour extends Behaviour<IExplosionBehaviourData> {
  public init(): void {
    this.entity.scene.game.events.on('explosion', this.onExplosion, this);
  }
  private onExplosion(data: IExplosionEvent) {
    const matrix = this.entity.world.grid.matrix;
    const leeSearch = new LeeSearch();
    //
    const path = leeSearch.floodFill(matrix, this.entity.isoPosition, this.data.range);

    let isPath:boolean = false;

    for (let x = 0; x < path.length; x++) {
      for (let y = 0; y < path[x].length; y++) {
        if (path[x][y] == 0) {
          isPath = true;
          this.particle(x, y);
        }
      }
    }

    if(!isPath){
      this.particle(this.entity.isoPosition.x, this.entity.isoPosition.y);
    }
  }

  public particle(x: number, y: number) {

    this.entity.world.entityFactory.create('fire', x, y, 'units').once(Phaser.GameObjects.Events.DESTROY, ()=>{
      this.entity.world.container.scene.game.events.emit('explosioncomplete', {
        position: {x:x, y:y},
        damage:this.data.damage
      });
    }, this)
    
  }

  public dispose(): void {
    this.entity.scene.game.events.off('explosion', this.onExplosion, this);
  }
}
