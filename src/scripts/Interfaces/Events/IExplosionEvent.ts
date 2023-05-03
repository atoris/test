import { Position } from '../../Providers/WorldProvider';

/**
 * Detonation signal
 */
export interface IExplosionEvent {
  range: number;
  position: Position;
}
