import { Schema, Document, model } from 'mongoose';

export interface UserDetails extends Document {
  userId: string;
  // Other user details
}

const userDetailsSchema = new Schema<UserDetails>({
  userId: { type: String, required: true },
  // Define other user fields here
});

export const UserDetailsModel = model<UserDetails>('UsersDetail', userDetailsSchema);
