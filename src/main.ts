import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './routes/middlewares/all.exception.fiter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Start Wars API')
  .setDescription('Awesome Start Wars')
  .setVersion('1.0')
  .addTag('star wars')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
