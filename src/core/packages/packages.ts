import { EventEmitter } from 'events';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { fork } from 'child_process';
import async_hooks from 'async_hooks';

import { injectable, inject, ContainerModule, Container } from 'inversify';
import { format } from 'date-fns';
import nconf from 'nconf';
import dotenv from 'dotenv';
import winston from 'winston';
import fse from 'fs-extra';
import colors from 'colors';
import fastify from 'fastify';
import express from 'express';

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

  public static get child_process() {
    return { fork };
  }

  public static get async_hooks() {
    return {
      AsyncLocalStorage: async_hooks.AsyncLocalStorage,
    };
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

  public static get winston() {
    return {
      winston,
      format: winston.format,
      Logger: winston.Logger,
      transports: winston.transports,
    };
  }

  public static get colors() {
    return { colors };
  }

  public static get dateFns() {
    return {
      format: format,
    };
  }

  public static get fastify() {
    return { fastify };
  }

  public static get express() {
    return { express };
  }
}
