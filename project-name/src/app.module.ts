import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetailGateway } from './gateways/user-detail.gateway';
import { UserDetailController } from './user-detail.controller';
import { EventRecurringModel } from './models/event-recurring.model';
import { UserDetailsModel } from './models/user-details.model';
// import { EventRecurringModel, UserDetailsModel } from './models';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs-app'),
    MongooseModule.forFeature([
      { name: 'EventRecurring', schema: EventRecurringModel.schema },
      { name: 'UserDetails', schema: UserDetailsModel.schema },
    ]),
  ],
  controllers: [UserDetailController],
  providers: [UserDetailGateway],
})
export class AppModule {}
