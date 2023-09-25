import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetCollaboratorHourRecordsSum } from '@app/useCases/hour-record/get-hour-records-sum/get-collaborator-hour-records-sum';
import { GetCollaboratorHourRecordsSumController } from './collaborator-hour-records-sum-controller';

@Module({
  imports: [DatabaseModule],
  controllers: [GetCollaboratorHourRecordsSumController],
  providers: [GetCollaboratorHourRecordsSum],
})
export class HourRecordControllerModule {}
