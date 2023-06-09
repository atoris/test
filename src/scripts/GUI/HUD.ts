import { EventsType } from '../Consts/Events';
import { IWeaponControlBehaviourData } from '../Interfaces/Behaviour/IWeaponControlBehaviourData';
import { Button } from './Button';
import { GridPanel } from './GridPanel';

/**
 * HUD for displaying the button bar
 */
export class HUD extends Phaser.GameObjects.Container {
  private _buttonPanel: GridPanel;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.scene.game.events.on(EventsType.drawweapon, this.createWeaponPanel, this);
  }

  private createWeaponPanel(data: IWeaponControlBehaviourData): void {
    this._buttonPanel = new GridPanel(this.scene);

    data.weapons.forEach((item) => {
      const button = new Button(this.scene, item);
      this._buttonPanel.addItem(button);
    });

    this.add(this._buttonPanel);

    this._buttonPanel.setScale(0.5);

    this._buttonPanel.x = this._buttonPanel.width / 2;
    this._buttonPanel.y = this.scene.scale.height - this._buttonPanel.displayHeight / 2;
    this.scene.add.container(0, 0, this);
  }

  public destroy(fromScene?: boolean | undefined): void {
    super.destroy(fromScene);
    this.scene.game.events.off(EventsType.drawweapon, this.createWeaponPanel, this);
  }
}
