import { Behaviour } from './Behaviour';
import { IAnimationBehaviourData } from '../../Interfaces/Behaviour/IAnimationBehaviour';

export class AnimationBehaviour extends Behaviour<IAnimationBehaviourData> {
  public init(): void {
    this.entity.removeAll(true);

    this.entity.scene.anims.create({
      key: this.data.texture,
      frames: this.entity.scene.anims.generateFrameNames(this.data.texture),
      repeat: 0,
    });
    const sprite = this.entity.scene.add.sprite(0, 0, this.data.texture).setScale(5);
    this.entity.add(sprite);
    sprite.play({ key: this.data.texture, repeat: 0 }).on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      () => {
        this.entity.dispose();        
      },
      this
    );
  }
}
