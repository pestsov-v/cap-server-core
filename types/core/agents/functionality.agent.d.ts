export interface IFunctionalityAgent {
  readonly discovery: NFunctionalityAgent.Discovery;
}

export namespace NFunctionalityAgent {
  export type Discovery = {
    getMandatory<T>(name: string): T;
    getString(name: string, def: string): string;
    getNumber(name: string, def: number): number;
    getBoolean(name: string, def: boolean): boolean;
    getArray<T>(name: string, def: Array<T>): Array<T>;
    getBuffer(path: string): Promise<Buffer>;
  };
}
