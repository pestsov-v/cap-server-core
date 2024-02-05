import {
  setController as schemeSetController,
  ControllerStructure as SchemeControllerStructure,
} from '@chaminjector/typescheme';
import { ControllerHandler, ControllerStructure } from '@Core/Types';

export const setController = <T extends Record<string, ControllerHandler>>(
  structure: ControllerStructure<T>
): SchemeControllerStructure<T> => {
  return schemeSetController<T, 'server'>('server', structure);
};
