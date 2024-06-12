import mongoose, { Model, Schema } from 'mongoose';

type Booking = {
    date: string;
    slots: mongoose.Types.ObjectId[];
    room: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    totalAmount: number;
    isConfirmed: 'unconfirmed' | 'confirmed';
};

const BookingSchema = new Schema<Booking>({
    date: String,
    slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalAmount: Number,
    isConfirmed: { type: String, enum: ['unconfirmed', 'confirmed'], default: 'unconfirmed' }
});

const BookingModel: Model<Booking> = mongoose.model('Booking', BookingSchema);
export default BookingModel;
