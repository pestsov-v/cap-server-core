import { Packages } from '@Packages';
const { colors } = Packages.colors;
const { format } = Packages.dateFns;

import { Color } from '@Packages/Types';
import { NLoggerService } from '@Core/Types';

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

  public static switchChecker(variant: never): Error {
    return new Error('Not implemented');
  }

  public static levelConsoleLog(
    msg: string,
    color: keyof Color.Color,
    loggerLevels: keyof NLoggerService.CoreLoggerLevels | keyof NLoggerService.SchemaLoggerLevels,
    service?: string,
    levelColors?: keyof Color.Color,
    levelBgColors?: keyof Color.Color
  ): void {
    let namespace: string = '';
    if (service) {
      namespace = Helpers.addBrackets(Helpers.centralized(20, service));
    }
    const level = Helpers.addLevel(
      loggerLevels,
      levelBgColors ?? 'bgMagenta',
      levelColors ?? 'green'
    );

    const log = format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' ' + level + namespace + msg;
    console.log(colors[color](log));
  }
}
