import { Packages } from '@Packages';
const { colors } = Packages.colors;

import { Color } from '@Packages/Types';

export class Helpers {
  public static addBrackets(str: string): string {
    return ' [ ' + str + ' ] ';
  }

  public static addLevel(level: string, bg: keyof Color.Color, color: keyof Color.Color) {
    const spacesToAdd = 11 - level.length;

    const leftSpaces = Math.floor(spacesToAdd / 2);
    const rightSpaces = spacesToAdd - leftSpaces;

    return colors[bg][color](
      ' '.repeat(leftSpaces) + level.toUpperCase() + ' '.repeat(rightSpaces)
    );
  }

  public static centralized(maxLength: number, str: string): string {
    const spacesToAdd = maxLength - str.length;

    const leftSpaces = Math.floor(spacesToAdd / 2);
    const rightSpaces = spacesToAdd - leftSpaces;

    return ' '.repeat(leftSpaces) + str + ' '.repeat(rightSpaces);
  }
}
