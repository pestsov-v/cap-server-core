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
        EMAIL: {
          type: 'string',
          nullable: false,
          length: 320,
        },
        PHONE: {
          type: 'string',
          nullable: false,
          length: 13,
        },
        FIRST_NAME: {
          type: 'string',
          nullable: false,
          length: 50,
        },
        LAST_NAME: {
          type: 'string',
          nullable: false,
          length: 50,
        },
      },
    });
  }
)
export class SysUsersTypeormSchema {}
