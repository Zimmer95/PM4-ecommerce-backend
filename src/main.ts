import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { loggerGlobal } from "./middlewares/logger.middleware";
import { ValidationPipe } from "@nestjs/common";
import { Auth0Config } from "./config/auth0.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const { auth } = require("express-openid-connect");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* app.use(auth(Auth0Config)); */
  const options = new DocumentBuilder()
    .setTitle("Ecommerce-Zimmer95 API")
    .setDescription("This is the OpenAPI documentation for an eCommerce application created by Zimmer95")
    .setVersion("3.0")
    .addBearerAuth()
    .addTag("Authorization")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.use(loggerGlobal);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
