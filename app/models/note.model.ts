import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please fill your User Id"],
        },
        note: {
            type: String,
        },
    },
    { timestamps: true }
);

const Note =
    mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;