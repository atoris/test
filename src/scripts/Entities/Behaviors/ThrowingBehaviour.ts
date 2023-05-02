import { IThrowingBehaviourData } from '../../Interfaces/Behaviour/IThrowingBehaviourData';
import { IFireEvent } from '../../Interfaces/Events/IFireEvent';
import IsoUtils from '../../Utils/IsoUtils';
import { Behaviour } from './Behaviour';

export class ThrowingBehaviour extends Behaviour<IThrowingBehaviourData> {
  private _follower: { t: number; vec: Phaser.Math.Vector2 };
  private _path: Phaser.Curves.Path;

  public init(extra: IFireEvent): void {
    this._follower = { t: 0, vec: new Phaser.Math.Vector2() };
    this._path = new Phaser.Curves.Path(this.entity.x, this.entity.y);

    const power = extra.power / 2000;
    const percent = Phaser.Math.Clamp(power, 0.25, 1);
    const end = { x: Math.floor(this.entity.isoPosition.x + this.data.distance * percent), y: this.entity.isoPosition.y };

    const world = IsoUtils.toWorld(end.x, end.y);

    this._path.cubicBezierTo(
      world.x,
      world.y,
      world.x - 200 * percent,
      world.y - 400 * percent,
      world.x - 100 * percent,
      world.y - 100 * percent
    );

    const target = this.entity.world.entityFactory.create('target', end.x, end.y, 'units');

    const tween = this.entity.scene.tweens.add({
      targets: this._follower,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 1000* percent,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.entity.isoPosition = end;

        target.dispose();

        this.entity.scene.game.events.emit('explosion', { position: end }, this);
        this.entity.dispose();
      },
    });

    this.entity.scene.events.on('update', this.onUpdate, this);
  }

  public onUpdate() {
    const point = this._path.getPoint(this._follower.t, this._follower.vec);
    this.entity.x = point.x;
    this.entity.y = point.y;
  }

  public dispose(): void {
    this.entity.scene.events.off('update', this.onUpdate, this);
  }
}
