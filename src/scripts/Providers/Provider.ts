export interface ProviderScheme {
  id: string;
}

/**
 * parsing the configs and converting them to a normal form with typing
 */
export class Provider<T> {
  private data: Map<string | number, T> = new Map<string | number, T>();

  /**
   * parse config and make it look like key-data
   * @param data config
   */
  constructor(data: any) {
    for (const key in data) {
      if (!key) {
        continue;
      }
      if (!data[key].id) {
        data[key].id = key;
      }
      this.data.set(data[key].id, data[key] as T);
    }
  }

  /**
   * Returns the structure of the desired config by its id
   * @param id id of config e.g. "player"
   * @returns
   */
  public get<Scheme>(id: string | number): Scheme {
    return this.data.get(id) as Scheme;
  }

  /**
   * @see Map.forEach
   */
  public forEach(callbackfn: (value: T, key: any, map: Map<any, T>) => void, thisArg?: any): void {
    this.data.forEach((v: T, k: any, m: Map<any, T>) => {
      callbackfn(v, k, m);
    }, thisArg);
  }
}
