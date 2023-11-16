import { TypeormSchema } from '@Vendor';
import { SysUsersSymbols } from './sys.users.symbols';
import { TypeormSchemaNames } from '../typeorm-schema.names';
import { NSysUsers } from '../../../../../types/schemas';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { BoolYesNo } from '@Utility/Types';

@TypeormSchema<NSysUsers.UserEntitySchema>(
  SysUsersSymbols.TypeormSchema,
  TypeormSchemaNames.SYS_USERS,
  () => {
    return new EntitySchema<NSysUsers.UserEntitySchema>({
      name: TypeormSchemaNames.SYS_USERS,
      tableName: TypeormSchemaNames.SYS_USERS,
      columns: {
        SYS_RG_USER_ID: {
          type: 'string',
          primary: true,
          generated: 'uuid',
        },
        FIRST_NAME: {
          type: 'varchar',
          nullable: false,
          length: 50,
        },
        MIDDLE_NAME: {
          type: 'varchar',
          length: 50,
          nullable: true,
        },
        LAST_NAME: {
          type: 'varchar',
          nullable: false,
          length: 50,
        },
        LOGIN: {
          type: 'varchar',
          length: 50,
          unique: true,
          nullable: true,
        },
        EMAIL: {
          type: 'varchar',
          nullable: false,
          length: 320,
          unique: true,
        },
        PHONE: {
          type: 'char',
          nullable: false,
          length: 13,
          unique: true,
        },
        PASSWORD: {
          type: 'varchar',
          nullable: false,
          length: 100,
        },
        ACTIVATE_TOKEN: {
          name: 'ACTIVATE_TOKEN',
          type: 'enum',
          enum: [BoolYesNo.YES, BoolYesNo.NO],
          nullable: false,
          default: BoolYesNo.NO,
        },
        MAX_SESSIONS: {
          type: 'integer',
          nullable: false,
          default: 2,
        },
        IS_BLOCKED: {
          name: 'IS_BLOCKED',
          type: 'enum',
          enum: [BoolYesNo.YES, BoolYesNo.NO],
          nullable: false,
          default: BoolYesNo.NO,
        },
        IS_VERIFIED: {
          name: 'IS_VERIFIED',
          type: 'enum',
          enum: [BoolYesNo.YES, BoolYesNo.NO],
          nullable: false,
          default: BoolYesNo.NO,
        },
        CREATED_AT: {
          type: 'timestamp',
          nullable: false,
          default: () => 'CURRENT_TIMESTAMP',
        },
        UPDATED_AT: {
          type: 'timestamp',
          nullable: true,
        },
      },
    });
  }
)
export class SysUsersTypeormSchema {}
