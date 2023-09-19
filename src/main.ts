import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['log', 'debug'],
	});

	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle('Citizen API Documentation')
		.setDescription('Citizen API Documentation')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('document', app, document);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() => console.log(`Server running on port 3000`));
