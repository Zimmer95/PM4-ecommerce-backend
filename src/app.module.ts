import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { ProductsModule } from "./modules/products/products.module";
import { UsersModule } from "./modules/users/users.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersModule } from "./modules/orders/orders.module";
import { OrderDetailsModule } from "./modules/orderDetails/order-details.module";
import { FilesModule } from "./modules/files/files.module";
import { DateAdder } from "./interceptors/date-adder.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import typeOrmConfig from "./config/typeorm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    CategoriesModule,
    AuthModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    OrderDetailsModule,
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1h" },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DateAdder,
    },
  ],
})
export class AppModule {}
