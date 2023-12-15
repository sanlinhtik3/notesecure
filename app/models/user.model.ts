import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please fill your Email"],
        },
        email: {
            type: String,
            required: [true, "Please fill your Email"],
        },
        password: {
            type: String,
            required: [true, "Please fill your password"],
        },
        asset: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3, 4],
            required: [true, "Please fill your Access"],
        },
    },
    { timestamps: true }
);

const User =
    mongoose.models.User || mongoose.model("User", UserSchema);

export default User;