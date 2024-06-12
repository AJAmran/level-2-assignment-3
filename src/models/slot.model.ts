import mongoose, { Model, Schema } from 'mongoose';

type Slot = {
    room: mongoose.Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
};

const SlotSchema = new Schema<Slot>({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    date: String,
    startTime: String,
    endTime: String,
    isBooked: { type: Boolean, default: false }
});

const SlotModel: Model<Slot> = mongoose.model('Slot', SlotSchema);
export default SlotModel;
