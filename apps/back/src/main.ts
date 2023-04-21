import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { ConfigurationService } from './app/configuration/configuration';
import { WinstonLogger } from './app/logging/winston-logger.service';
import { setupSwagger } from './app/swagger/setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });

  const configService = app.get(ConfigurationService);
  const port = configService.get<number>('PORT');

  app
    .use(helmet())
    .useGlobalPipes(new ValidationPipe())
    .enableCors({ origin: configService.get<string>('FRONTEND_URL') });


  setupSwagger(app);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(`Environment: ${process.env['NODE_ENV']}`);
}

bootstrap();
