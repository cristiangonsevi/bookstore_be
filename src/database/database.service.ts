import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { Configuration } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres',
        host: config.get(Configuration.HOST),
        port: 5444,
        database: config.get(Configuration.DATABASE),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/entity/*.entity.{js,ts}'],
        migrations: [path.join(__dirname + '/migrations/*{.ts, .js}')],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];
