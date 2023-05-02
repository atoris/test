import { Position } from "../../Providers/WorldProvider";

export interface IExplosionCompleteEvent {
  position:Position
  damage: number;
}
