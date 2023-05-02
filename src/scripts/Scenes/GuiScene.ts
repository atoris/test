import { Scene } from 'phaser';
import { GameOverView } from '../GUI/GameOverView';
import { HUD } from '../GUI/HUD';

export class GuiScene extends Scene {
  constructor() {
    super({ key: 'GuiScene' });
  }

  create() {
    const hud = new HUD(this);
    const gameOverView = new GameOverView(this);

    gameOverView.setVisible(false);

    this.game.events.on('gameover',()=>{
      hud.setVisible(false)
      gameOverView.setVisible(true);
    })
  }

  update() {}
}
