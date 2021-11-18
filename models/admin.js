
import pkg from 'mongoose';
import validator from "validator";
const { Schema, model } = pkg;


const adminSchema = new Schema(
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
        password: String,
    },
    { timestamps: true }
);


export default model("Admin", adminSchema);
