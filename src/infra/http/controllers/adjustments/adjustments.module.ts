import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { FindAdjustmentController } from './find-adjustment-controller';
import { ValidateAdjustmentController } from './validate-adjustment-controller';
import { CheckAdjustmentExistenceController } from './check-adjustment-existence-controller';
import { ListAdjustmentController } from './list-adjustments-controller';
import { CreateAdjustmentController } from './create-adjustment-controller';
import { FindAdjustment } from '@app/useCases/request/find-adjustment/find-adjustment';
import { ValidateAdjustment } from '@app/useCases/request/validate-adjustment/validate-adjustment';
import { CheckAdjustmentExistence } from '@app/useCases/request/check-adjustment-existence/check-adjustment-existence';
import { ListAdjustments } from '@app/useCases/request/list-adjustments/list-adjustments';
import { CreateAdjustment } from '@app/useCases/request/create-adjustment/create-adjustment';

@Module({
  imports: [DatabaseModule],
  controllers: [
    FindAdjustmentController,
    ValidateAdjustmentController,
    CheckAdjustmentExistenceController,
    ListAdjustmentController,
    CreateAdjustmentController,
  ],
  providers: [
    FindAdjustment,
    ValidateAdjustment,
    CheckAdjustmentExistence,
    ListAdjustments,
    CreateAdjustment,
  ],
})
export class AdjustmentsControllerModule {}
