import Behaviors from '.';
import { Entity } from '../Entity';
import { Behaviour } from './Behaviour';
import { IBehaviourData } from '../../Interfaces/Behaviour/IBehaviourData';
import { IDisposable } from '../../Interfaces/IDisposable';

/**
 * Behavior management service on the entity
 */
export class BehaviourService extends Phaser.Events.EventEmitter implements IDisposable {
  public behaviours: Behaviour<IBehaviourData>[] = [];

  constructor(private _entity: Entity) {
    super();
  }

  /**
   * add behavior on entity
   * @param name id of behavior
   * @param data parameters of behavior from config
   * @param extra is for adding or changing standard data from config
   * @returns
   */
  public addBehavior(name: string, data: IBehaviourData, extra?: any): Behaviour<IBehaviourData> {
    var behavior: Behaviour<IBehaviourData> = new Behaviors[name](this._entity, data);

    behavior.name = name;
    behavior.init(extra);

    this.behaviours.push(behavior);

    return behavior;
  }

  /**
   * checks if the entity has the correct behavior class
   * @param name id of the behavior, named like the class itself
   * @returns
   */
  public hasBehaviour(name: string): boolean {
    return this.behaviours.findIndex((beh) => beh.name == name) != -1;
  }

  public dispose(): void {
    for (let i = 0; i < this.behaviours.length; i++) {
      this.behaviours[i].dispose();
    }
  }
}
