
import mongoose from 'mongoose';
// const { Schema, model, Schema } = pkg;
import Participant from './participant.js';
import Admin from './admin.js';

const meetingSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Admin,
    },
    title: String,
    agenda: String,
    startTime: Date,
    endTime: Date,
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Participant,
    }],
    status: {
      type: String,
      enum: ["SCHEDULED", "ONGOING", "ENDED", "CANCELLED"],
      default: "SCHEDULED"
    },



  },
  { timestamps: true }
);


export default mongoose.model("Meeting", meetingSchema);
