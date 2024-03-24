import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { BusinessModule } from "./business/business.module";
import { UserModule } from "./users/user.module";
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    BusinessModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController]
})
export class AppModule {}
