import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: parseInt(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: [__dirname + '/**/*.entities{.ts,.js}'],
			synchronize: true,
			logging: true,
			autoLoadEntities: true,
			schema: 'public',
		}),
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
		AdminModule,
		ProfileModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
