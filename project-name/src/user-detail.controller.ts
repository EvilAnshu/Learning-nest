import { Controller, Get } from '@nestjs/common';
import { UserDetailGateway } from './gateways/user-detail.gateway';

@Controller('user-details')
export class UserDetailController {
  constructor(private readonly userDetailGateway: UserDetailGateway) {}

  @Get()
  getUserDetails() {
    const eventId = 'your-event-id';
    const userList = ['user1', 'user2', 'user3'];

    this.userDetailGateway.handleGetUserDetails(null, { eventId, userList });
  }
}
