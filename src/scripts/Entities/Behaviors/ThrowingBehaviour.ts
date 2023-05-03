import { EventsType } from '../../Consts/Events';
import { GroupsTypes } from '../../Consts/Groups';
import { IThrowingBehaviourData } from '../../Interfaces/Behaviour/IThrowingBehaviourData';
import { IFireEvent } from '../../Interfaces/Events/IFireEvent';
import { Position } from '../../Providers/WorldProvider';
import IsoUtils from '../../Utils/IsoUtils';
import { Behaviour } from './Behaviour';

/**
 * flight behavior of the entity on an arc
 */
export class ThrowingBehaviour extends Behaviour<IThrowingBehaviourData> {
  private _follower: { t: number; vec: Phaser.Math.Vector2 };
  private _path: Phaser.Curves.Path;

  public init(extra: IFireEvent): void {
    this._follower = { t: 0, vec: new Phaser.Math.Vector2() };
    this._path = new Phaser.Curves.Path(this.entity.x, this.entity.y);

    const power = extra.power / 2000;
    const percent = Phaser.Math.Clamp(power, this.data.min / this.data.max, 1);
    const end = {
      x: Math.floor(this.entity.isoPosition.x + this.data.max * percent),
      y: this.entity.isoPosition.y,
    };

    const world = IsoUtils.toWorld(end.x, end.y);

    this._path.cubicBezierTo(
      world.x,
      world.y,
      world.x - 200 * percent,
      world.y - 400 * percent,
      world.x - 100 * percent,
      world.y - 100 * percent
    );

    this.createTween(percent, end);

    this.entity.scene.events.on(Phaser.Scenes.Events.UPDATE, this.onUpdate, this);
  }

  private createTween(percent: number, end: Position): void {
    const target = this.entity.world.entityFactory.create('target', end.x, end.y, GroupsTypes.units);

    this.entity.scene.tweens.add({
      targets: this._follower,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 1000 * percent,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.entity.isoPosition = end;

        target.dispose();

        this.entity.scene.game.events.emit(EventsType.explosion, { position: end }, this);
        this.entity.dispose();
      },
    });
  }

  public onUpdate(): void {
    const point = this._path.getPoint(this._follower.t, this._follower.vec);
    this.entity.x = point.x;
    this.entity.y = point.y;
  }

  public dispose(): void {
    this.entity.scene.events.off(Phaser.Scenes.Events.UPDATE, this.onUpdate, this);
  }
}
