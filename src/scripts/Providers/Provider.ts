export interface ProviderScheme {
  id: string;
}

export class Provider<T> {
  private data: Map<any, T> = new Map<any, T>();

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
  public get<Scheme>(id): Scheme {
    return this.data.get(id) as Scheme;
  }
  public has(id): boolean {
    return this.data.has(id);
  }
  public set(id, data: T): Map<any, T> {
    return this.data.set(id, data);
  }

  public getAll(): Map<string, T> {
    return this.data;
  }

  public forEach(callbackfn: (value: T, key: any, map: Map<any, T>) => void, thisArg?: any): void {
    this.data.forEach((v: T, k: any, m: Map<any, T>) => {
      callbackfn(v, k, m);
    }, thisArg);
  }
}
