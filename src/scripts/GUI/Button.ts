import { EventsType } from '../Consts/Events';

/**
 * Button with a grenade icon
 * When clicked signals that the player has thrown a grenade
 */
export class Button extends Phaser.GameObjects.Container {
  private _id: string;

  private _body: Phaser.GameObjects.Image;
  private _icon: Phaser.GameObjects.Image;
  private _lock: Phaser.GameObjects.Image;

  public constructor(scene: Phaser.Scene, id: string) {
    super(scene);

    this._id = id;

    this.createButton();
    this.initEvents();
  }

  private initEvents(): void {
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);

    this.scene.game.events.on(EventsType.explosion, this.onExplosion, this);
    this.scene.game.events.on(EventsType.fire, this.onFire, this);
  }

  private createButton(): void {
    this._body = this.scene.add.image(0, 0, 'tiles', 'button_body_active');
    this._icon = this.scene.add.image(0, 0, 'tiles', this._id);
    this._lock = this.scene.add.image(0, 0, 'tiles', 'lock');

    this.add([this._body, this._icon, this._lock]);
    this.setSize(this._body.width, this._body.height);

    this._lock.setVisible(false);
    this.setInteractive();
  }

  private onFire(): void {
    this._body.setTint(0x999999);
    this._icon.setTint(0x999999);
    this.setActive(false);
  }

  private onExplosion(): void {
    this._icon.clearTint();
    this._body.clearTint();
    this.setActive(true);
  }

  private onPointerDown(): void {
    if (this.active) {
      this._body.setTexture('tiles', 'button_body_deactive');
    }
  }

  private onPointerUp(pointer: Phaser.Input.Pointer): void {
    if (this.active) {
      this._body.setTexture('tiles', 'button_body_active');
      this.scene.game.events.emit(EventsType.fire, {
        power: pointer.upTime - pointer.downTime,
        id: this._id,
      });
      this.onFire();
    }
  }

  public destroy(fromScene?: boolean | undefined): void {
    super.destroy(fromScene);
    
    this.off(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.off(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);

    this.scene.game.events.off(EventsType.explosion, this.onExplosion, this);
    this.scene.game.events.off(EventsType.fire, this.onFire, this);
  }
}
