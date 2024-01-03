import { WsListenerStructure } from '@Core/Types';

export const setWsListener = <T extends string>(
  structure: WsListenerStructure<T>
): WsListenerStructure<T> => {
  return structure;
};
