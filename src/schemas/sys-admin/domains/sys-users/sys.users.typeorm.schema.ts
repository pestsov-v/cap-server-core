import { TypeormSchema } from '@Vendor';
import { SysUsersSymbols } from './sys.users.symbols';
import { TypeormSchemaNames } from '../typeorm-schema.names';
import { NSysUsers } from '../../../../../types/schemas';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';

@TypeormSchema<NSysUsers.UserEntitySchema>(
  SysUsersSymbols.TypeormSchema,
  TypeormSchemaNames.SYS_USERS,
  () => {
    return new EntitySchema({
      name: TypeormSchemaNames.SYS_USERS,
      columns: {
        USER_ID: {
          type: 'string',
          primary: true,
          generated: 'uuid',
        },
        EMAIL: {
          type: 'varchar',
          nullable: false,
          length: 320,
        },
        PHONE: {
          type: 'varchar',
          nullable: false,
          length: 13,
        },
        FIRST_NAME: {
          type: 'varchar',
          nullable: false,
          length: 50,
        },
        LAST_NAME: {
          type: 'varchar',
          nullable: false,
          length: 50,
        },
      },
    });
  }
)
export class SysUsersTypeormSchema {}
