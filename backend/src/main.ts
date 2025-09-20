import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  // confiar en proxy para que no elimine "secure"
  server.set('trust proxy', 1); // Railway/Heroku necesitan esto para respetar secure cookies
  //cookies con express
  app.use(cookieParser());
  //corss
  const corsOptions: CorsOptions = {
    origin: 'https://fs-nextjs-nest.js.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  //configuracion de socket.io -> adaptador <- nativo de nest
  app.useWebSocketAdapter(new IoAdapter(app));

  // Configuración del Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Ecommerce')
    .setDescription('Documentación de la API del proyecto')
    .setVersion('1.0')
    .addBearerAuth() // si usás JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // URL: http://localhost:3000/api-docs

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); //!usar los pipes, osea los validadores
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
