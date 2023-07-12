import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from 'src/models/user-details.model';
import { EventRecurring } from 'src/models/event-recurring.model';
import { EventRecurringModel } from '../models/event-recurring.model';
import { UserDetailsModel } from '../models/user-details.model';

@WebSocketGateway()
export class UserDetailGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel('EventRecurring') private readonly eventRecurringModel: Model<EventRecurring>,
    @InjectModel('UserDetails') private readonly userDetailsModel: Model<UserDetails>,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('getUserDetails')
  async handleGetUserDetails(client: Socket, data: { eventId: string; userList: string[] }) {
    try {
      const { eventId, userList } = data;
console.log(data)
      const event = await this.eventRecurringModel.findOne({ eventId });
console.log(event)
      if (!event) {
        // Event not found
        return;
      }

      const userDetails = await this.userDetailsModel.find({ userId: { $in: userList }, eventId });
console.log(userDetails);
      client.emit('userDetails', userDetails);
    } catch (error) {
      // Handle error
      client.emit('userDetails', []);
    }
  }
}





// import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { UserDetails } from 'src/models/user-details.model';
// import { EventRecurring } from 'src/models/event-recurring.model';
// import { EventRecurringModel } from '../models/event-recurring.model';
// import { UserDetailsModel } from '../models/user-details.model';

// @WebSocketGateway()
// export class UserDetailGateway {
//   constructor(
//     @InjectModel('EventRecurring') private readonly eventRecurringModel: Model<EventRecurring>,
//     @InjectModel('UserDetails') private readonly userDetailsModel: Model<UserDetails>,
//   ) {}

//   @WebSocketServer()
//   server: Server;

//   handleConnect(client: Socket) {
//     console.log('Client connected:', client.id);
//   }

//   handleDisconnect(client: Socket) {
//     console.log('Client disconnected:', client.id);
//   }

//   @SubscribeMessage('getUserDetails')
//   async handleGetUserDetails(client: Socket, data: { eventId: string; userList: string[] }) {
//     try {
//       const { eventId, userList } = data;

//       const event = await this.eventRecurringModel.findOne({ eventId });

//       if (!event) {
//         // Event not found
//         return;
//       }

//       const userDetails = await this.userDetailsModel.find({ userId: { $in: userList }, eventId });

//       client.emit('userDetails', userDetails);
//     } catch (error) {
//       // Handle error
//     }
//   }
// }







// import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { UserDetails } from 'src/models/user-details.model';
// import { EventRecurring } from 'src/models/event-recurring.model';
// import { EventRecurringModel } from '../models/event-recurring.model';
// import { UserDetailsModel } from '../models/user-details.model';
// // import { EventRecurring, EventRecurringModel, UserDetails, UserDetailsModel } from '../models';

// @WebSocketGateway()
// export class UserDetailGateway {
//   constructor(@InjectModel('EventRecurring') private readonly eventRecurringModel: Model<EventRecurring>,
//     @InjectModel('UserDetails') private readonly userDetailsModel: Model<UserDetails>) {}

//   @WebSocketServer()
//   server: Server;

//   @OnConnect()
//   handleConnect(client: Socket) {
//     console.log('Client connected:', client.id);
//   }

//   @OnDisconnect()
//   handleDisconnect(client: Socket) {
//     console.log('Client disconnected:', client.id);
//   }

//   @SubscribeMessage('getUserDetails')
//   async handleGetUserDetails(client: Socket, data: { eventId: string, userList: string[] }) {
//     try {
//       const { eventId, userList } = data;
      
//       const event = await this.eventRecurringModel.findOne({ eventId });

//       if (!event) {
//         // Event not found
//         return;
//       }

//       const userDetails = await this.userDetailsModel.find({ userId: { $in: userList }, eventId });

//       client.emit('userDetails', userDetails);
//     } catch (error) {
//       // Handle error
//     }
//   }
// }
