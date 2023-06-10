import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HttpModule, DatabaseModule, AuthModule],
})
export class AppModule {}
