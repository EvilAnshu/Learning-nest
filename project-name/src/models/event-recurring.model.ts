import { Schema, Document, model } from 'mongoose';

export interface EventRecurring extends Document {
  eventId: string;
  // Other event details
}

const eventRecurringSchema = new Schema<EventRecurring>({
  eventId: { type: String, required: true },
  // Define other event fields here
});

export const EventRecurringModel = model<EventRecurring>('EventRecurring', eventRecurringSchema);
