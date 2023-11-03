export class Guards {
  public static isNotUndefined(x: undefined | any): boolean {
    return typeof x !== 'undefined';
  }
}
