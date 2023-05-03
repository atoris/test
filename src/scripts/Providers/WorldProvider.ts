import { Provider, ProviderScheme } from './Provider';

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

/**
 * entities config structure from world.json
 */
export type WorldEntities = {
  id: string;
  position: Position;
};

/**
 * world.json config structure
 */
export interface WorldScheme extends ProviderScheme {
  world: Size;
  ground: string;
  entities: WorldEntities[];
}

/**
 * description of world.json configs
 */
export class WorldProvider extends Provider<WorldScheme> {}
