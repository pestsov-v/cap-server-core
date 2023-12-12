import { setTypeormSchema } from '@Vendor';
import { TypeormSchemaNames } from '../typeorm-schema.names';
import { NSysUsers } from '../../../../../types/schemas';
import { BoolYesNo } from '@Utility/Types';
import { SchemaModels } from '../../../../../types/schemas/schema-names';
import { EntitySchema } from 'typeorm';

export const SysUsersTypeormSchema = setTypeormSchema<SchemaModels, NSysUsers.UserEntitySchema>({
  model: 'sys_user',
  getSchema: (_) => {
    return new EntitySchema<NSysUsers.UserEntitySchema>({
      name: TypeormSchemaNames.SYS_USERS,
      tableName: TypeormSchemaNames.SYS_USERS,
      columns: {
        sys_rg_user_id: {
          type: 'string',
          primary: true,
          generated: 'uuid',
        },
        first_name: {
          type: 'varchar',
          nullable: false,
          length: 50,
        },
        middle_name: {
          type: 'varchar',
          length: 50,
          nullable: true,
        },
        last_name: {
          type: 'varchar',
          nullable: false,
          length: 50,
        },
        login: {
          type: 'varchar',
          length: 50,
          unique: true,
          nullable: true,
        },
        email: {
          type: 'varchar',
          nullable: false,
          length: 320,
          unique: true,
        },
        phone: {
          type: 'char',
          nullable: false,
          length: 13,
          unique: true,
        },
        password: {
          type: 'varchar',
          nullable: false,
          length: 100,
        },
        activate_token: {
          type: 'varchar',
          length: 320,
          nullable: false,
        },
        max_sessions: {
          type: 'integer',
          nullable: false,
          default: 2,
        },
        is_blocked: {
          type: 'enum',
          enum: [BoolYesNo.YES, BoolYesNo.NO],
          nullable: false,
          default: BoolYesNo.NO,
        },
        is_verified: {
          type: 'enum',
          enum: [BoolYesNo.YES, BoolYesNo.NO],
          nullable: false,
          default: BoolYesNo.NO,
        },
        created_at: {
          type: 'timestamp',
          nullable: false,
          default: () => 'CURRENT_TIMESTAMP',
        },
        updated_at: {
          type: 'timestamp',
          nullable: true,
        },
      },
    });
  },
});
