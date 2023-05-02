import { Provider, ProviderScheme } from './Provider';

export interface WeaponSchema extends ProviderScheme {
  distance: number;
  power: number;
}

export class WeaponsProvider extends Provider<WeaponSchema> {}
