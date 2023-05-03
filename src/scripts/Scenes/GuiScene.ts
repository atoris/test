import { Scene } from 'phaser';
import { EventsType } from '../Consts/Events';
import { GameOverView } from '../GUI/GameOverView';
import { HUD } from '../GUI/HUD';

/**
 * Scene for ui game
 */
export class GuiScene extends Scene {
  constructor() {
    super({ key: 'GuiScene' });
  }

  protected create(): void {
    const hud = new HUD(this);
    const gameOverView = new GameOverView(this);

    gameOverView.setVisible(false);

    this.game.events.on(EventsType.gameover, () => {
      hud.setVisible(false);
      gameOverView.setVisible(true);
    });
  }
}
