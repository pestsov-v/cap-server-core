import { WsListenerStructure } from '@Vendor/Types';

export const setWsListener = <T extends string>(
  structure: WsListenerStructure<T>
): WsListenerStructure<T> => {
  return structure;
};
