import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './services/profile.service';
import { ProfileRepository } from '../repositories/profile.repository';
import { ProfileController } from './controllers/profile.controller';
import { ApartmentRepository } from '../repositories/apartment.repository';
import { AdminModule } from '../admin/admin.module';
import { Profile } from '../entities/profile.entity';
import { Apartment } from '../entities/apartment.entity';
import { Building } from '../entities/building.entity';
import { Zone } from '../entities/zone.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Zone, Building, Apartment, Profile]),
		AdminModule,
	],
	providers: [ProfileService, ProfileRepository, ApartmentRepository],
	controllers: [ProfileController],
})
export class ProfileModule {}
