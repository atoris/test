
import { IEntityBehavior } from '../Interfaces/Behaviour/IEntityBehavior';
import { Provider, ProviderScheme } from './Provider';

export interface EntitySchema extends ProviderScheme {
  type: string;
  behaviours?:IEntityBehavior[]
}

export class EntitiesProvider extends Provider<EntitySchema> {}
