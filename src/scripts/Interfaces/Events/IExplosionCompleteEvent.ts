import { Position } from '../../Providers/WorldProvider';

/**
 * parameters for the explosion completion signal
 */
export interface IExplosionCompleteEvent {
  position: Position;
  damage: number;
}
