import { Schema, model, Types } from 'mongoose';

type Slot = {
  room: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

const slotSchema = new Schema<Slot>({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

export default model<Slot>('Slot', slotSchema);
