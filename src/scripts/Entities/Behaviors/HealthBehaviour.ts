import { IHealthBehaviourData } from '../../Interfaces/Behaviour/IHealthBehaviourData';
import { IExplosionCompleteEvent } from '../../Interfaces/Events/IExplosionCompleteEvent';
import { IExplosionEvent } from '../../Interfaces/Events/IExplosionEvent';
import { Behaviour } from './Behaviour';

export class HealthBehaviour extends Behaviour<IHealthBehaviourData> {
  private _healthBar: Phaser.GameObjects.Rectangle;
  private _health: number;

  public init(): void {
    this._health = this.data.health;

    const container = this.entity.scene.add.container(0, 0);
    const healthbg = new Phaser.GameObjects.Rectangle(this.entity.scene, 0, 0, 200, 20, 0x000000);
    this._healthBar = new Phaser.GameObjects.Rectangle(this.entity.scene, 0, 0, 200, 14, 0xff6400).setOrigin(0, 0.5);

    this._healthBar.setPosition(-this._healthBar.width / 2, 0);

    container.add([healthbg, this._healthBar]);
    container.setPosition(3, -90);
    this.entity.add(container);

    this.entity.scene.game.events.on('explosioncomplete', this.onExplosion, this);
  }

  private onExplosion(data: IExplosionCompleteEvent) {
    if (this.entity.isoPosition.x === data.position.x && this.entity.isoPosition.y === data.position.y) {
      this._health -= data.damage;
      const percent = this._health / this.data.health;

      this.entity.scene.tweens.add({
        targets: this._healthBar,
        width: Phaser.Math.Clamp(200 * percent, 0, 200),
        duration: 1000,
        ease: 'sine.inout',
        onComplete: () => {
          if (this._health <= 0) {
            this.entity.scene.game.events.emit('gameover');
          }
        },
      });
    }
  }

  public dispose(): void {
    this.entity.scene.game.events.off('explosion', this.onExplosion, this);
  }
}
