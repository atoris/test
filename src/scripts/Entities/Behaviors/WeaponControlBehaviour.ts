import { IWeaponControlBehaviourData } from '../../Interfaces/Behaviour/IWeaponControlBehaviourData';
import { IFireEvent } from '../../Interfaces/Events/IFireEvent';
import { Behaviour } from './Behaviour';

export class WeaponControlBehaviour extends Behaviour<IWeaponControlBehaviourData> {
  public init(): void {
    this.entity.scene.game.events.emit('drawweapon', this.data);
    this.entity.scene.game.events.on('fire', this.onFire, this);
  }

  private onFire(data: IFireEvent) {
    const entity = this.entity.world.entityFactory.create(data.id, this.entity.isoPosition.x, this.entity.isoPosition.y, 'units', data);
  }

  public dispose(): void {
    this.entity.scene.game.events.off('fire', this.onFire, this);
  }
}
