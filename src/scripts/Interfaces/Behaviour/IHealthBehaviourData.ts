import { IBehaviourData } from './IBehaviourData';

/**
 * The description of the behavior of the number of hp at the entity
 */
export interface IHealthBehaviourData extends IBehaviourData {
  health: number;
}
