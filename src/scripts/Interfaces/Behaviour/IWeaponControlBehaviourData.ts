import { IBehaviourData } from './IBehaviourData';

/**
 * The description of the behavioral config for the entity weapon
 */
export interface IWeaponControlBehaviourData extends IBehaviourData {
  weapons: string[];
}
