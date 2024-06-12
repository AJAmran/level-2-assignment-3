import mongoose, { Model, Schema } from 'mongoose';

type Room = {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    isDeleted: boolean;
};

const RoomSchema = new Schema<Room>({
    name: String,
    roomNo: Number,
    floorNo: Number,
    capacity: Number,
    pricePerSlot: Number,
    amenities: [String],
    isDeleted: { type: Boolean, default: false }
});

const RoomModel: Model<Room> = mongoose.model('Room', RoomSchema);
export default RoomModel;
