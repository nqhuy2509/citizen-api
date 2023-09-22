import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from '../entities/apartment.entity';
import { Building } from '../entities/building.entity';
import { Zone } from '../entities/zone.entity';
import { ApartmentRepository } from '../repositories/apartment.repository';
import { ApartmentController } from './controllers/apartment.controller';
import { ApartmentService } from './services/apartment.service';
import { AdminModule } from '../admin/admin.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Apartment, Building, Zone]),
		AdminModule,
	],
	controllers: [ApartmentController],
	providers: [ApartmentRepository, ApartmentService],
})
export class ApartmentModule {}
