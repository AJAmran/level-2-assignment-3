import { Schema, model, Types } from 'mongoose';

type Booking = {
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed' | 'cancelled';
};

const bookingSchema = new Schema<Booking>({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: true }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: { type: String, default: 'unconfirmed' }
});

export default model<Booking>('Booking', bookingSchema);
