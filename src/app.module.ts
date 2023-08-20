import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MailerModule.forRoot({
			transport: {
				host: process.env.MAIL_HOST,
				secure: false,
				auth: {
					user: process.env.MAIL_USERNAME,
					pass: process.env.MAIL_PASSWORD,
				},
			},
			defaults: {
				from: `No Reply <${process.env.MAIL_FROM_ADDRESS}>`,
			},
			template: {
				dir: __dirname + '/templates',
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
