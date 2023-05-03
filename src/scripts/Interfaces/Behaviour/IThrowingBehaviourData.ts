import { IBehaviourData } from './IBehaviourData';

/**
 * Description of grenade throw behavior config, minimum and maximum length
 */
export interface IThrowingBehaviourData extends IBehaviourData {
  min:number;
  max: number;
}
