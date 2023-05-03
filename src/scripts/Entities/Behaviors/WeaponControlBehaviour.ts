import { EventsType } from '../../Consts/Events';
import { GroupsTypes } from '../../Consts/Groups';
import { IWeaponControlBehaviourData } from '../../Interfaces/Behaviour/IWeaponControlBehaviourData';
import { IFireEvent } from '../../Interfaces/Events/IFireEvent';
import { Behaviour } from './Behaviour';

/**
 * behavior that signals which weapon to draw on the hood panel, and creates a grenade when thrown
 */
export class WeaponControlBehaviour extends Behaviour<IWeaponControlBehaviourData> {
  public init(): void {
    this.entity.scene.game.events.emit(EventsType.drawweapon, this.data);
    this.entity.scene.game.events.on(EventsType.fire, this.onFire, this);
  }

  private onFire(data: IFireEvent) {
    this.entity.world.entityFactory.create(
      data.id,
      this.entity.isoPosition.x,
      this.entity.isoPosition.y,
      GroupsTypes.units,
      data
    );
  }

  public dispose(): void {
    this.entity.scene.game.events.off(EventsType.fire, this.onFire, this);
  }
}
