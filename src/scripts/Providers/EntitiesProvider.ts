import { IEntityBehavior } from '../Interfaces/Behaviour/IEntityBehavior';
import { Provider, ProviderScheme } from './Provider';

/**
 * entity structure for the entities.json config
 */
export interface EntitySchema extends ProviderScheme {
  type: string;
  behaviours?: IEntityBehavior[];
}

/**
 * description of the entities.json configurations
 */
export class EntitiesProvider extends Provider<EntitySchema> {}
