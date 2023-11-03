import { EventEmitter } from 'events';
import os from 'os';
import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

import { injectable, inject, ContainerModule, Container } from 'inversify';
import nconf from 'nconf';
import dotenv from 'dotenv';

export class Packages {
  public static get inversify() {
    return {
      injectable,
      inject,
      ContainerModule,
      Container,
    };
  }

  public static get events() {
    return { EventEmitter };
  }

  public static get nconf() {
    return { nconf };
  }

  public static get dotenv() {
    return { dotenv };
  }

  public static get os() {
    return { os };
  }

  public static get fs() {
    return {
      fsp: fs.promises,
      fs: fs,
      fse: fse,
    };
  }

  public static get path() {
    return {
      path,
    };
  }
}
