import { IBehaviourData } from './IBehaviourData';

/**
 * a description of the behavior config for the explosion
 */
export interface IExplosionBehaviourData extends IBehaviourData {
  range: number;
  damage: number;
}
