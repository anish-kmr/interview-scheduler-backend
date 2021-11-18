
import pkg from 'mongoose';
import validator from "validator";
const { Schema, model } = pkg;


const participantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        phone: {
            type: Number,
            min: 1000000000,
            max: 9999999999,
        },
    },
    { timestamps: true }
);


export default model("Participant", participantSchema);
