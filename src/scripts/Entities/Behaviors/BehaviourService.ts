import Behaviors from '.';
import { Entity } from '../Entity';
import { Behaviour } from './Behaviour';
import { IBehaviourData } from '../../Interfaces/Behaviour/IBehaviourData';
import { IDisposable } from '../../Interfaces/IDisposable';

export class BehaviourService extends Phaser.Events.EventEmitter implements IDisposable {
  public behaviours: Behaviour<IBehaviourData>[] = [];

  constructor(private _entity: Entity) {
    super();
  }

  public addBehavior<T1 extends Behaviour<IBehaviourData>>(
    type: string | { new (entity: Entity, data: IBehaviourData): T1 },
    data: IBehaviourData,
    extra?: any
  ): Behaviour<IBehaviourData> {
    var behavior: Behaviour<IBehaviourData>;

    if (typeof type === 'string') {
      behavior = new Behaviors[type](this._entity, data);
      behavior.name = type;
    } else {
      behavior = new type(this._entity, data);
      behavior.name = type.name;
    }

    this.behaviours.push(behavior);

    behavior.init(extra);

    return behavior;
  }

  public removeBehavior(behaviour: Behaviour<IBehaviourData>): Entity {
    const index = this.behaviours.findIndex((x) => x.name == behaviour.name);

    const beh = this.behaviours[index];
    beh.dispose();
    this.behaviours.splice(index, 1);

    return this._entity;
  }

  public hasBehaviour(type: string): boolean {
    return this.behaviours.findIndex((beh) => beh.name == type) != -1;
  }

  public getBehavior(type: string): Behaviour<IBehaviourData> | undefined {
    return this.behaviours.find((beh) => beh.name == type);
  }

  public dispose(): void {
    for (let i = 0; i < this.behaviours.length; i++) {
      this.behaviours[i].dispose();
    }
  }
}
