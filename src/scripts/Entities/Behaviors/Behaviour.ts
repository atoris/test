import { Entity } from '../Entity';
import { IBehaviourData } from '../../Interfaces/Behaviour/IBehaviourData';
import { IDisposable } from '../../Interfaces/IDisposable';

/**
 * abstract class of behavior
 */
export abstract class Behaviour<T extends IBehaviourData> extends Phaser.Events.EventEmitter implements IDisposable {
  public name: string;
  public data: T;
  public entity: Entity;

  constructor(entity: Entity, data: T) {
    super();
    this.entity = entity;
    this.data = data;
  }
  public dispose(): void {}
  public init(extra?: any): void {}
}
