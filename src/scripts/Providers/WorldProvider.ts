import { Provider, ProviderScheme } from './Provider';

export type Position = {
  x: number;
  y: number;
};
export type Size = {
  width: number;
  height: number;
};
export type WorldEntities = {
  id: string;
  position: Position;
};

export interface WorldScheme extends ProviderScheme {
  world: Size;
  ground: string;
  entities: WorldEntities[];
}

export class WorldProvider extends Provider<WorldScheme> {}
