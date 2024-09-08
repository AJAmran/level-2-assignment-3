import { Request, Response } from "express";
import Room from "../models/room.model";

//create room (Admin only)
export const createRoom = async (req: Request, res: Response) => {
  const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } = req.body;

  try {
    const room = await Room.create({
      name,
      roomNo,
      floorNo,
      capacity,
      pricePerSlot,
      amenities,
    });
    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Room added successfully",
      data: room,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get All Rooms
export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ isDeleted: false });
    res.status(200).json({
      statusCode: 200,
      message: "Room retrieved successfully",
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get single room
export const getSingleRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room retrieved successfully",
      data: room,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update room (admin only)
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room updated successfully",
      data: room,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete room (soft delete, admin only)

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    res.status(200).json({
      statusCode: 200,
      message: "Room deleted successfully",
      data: room,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
