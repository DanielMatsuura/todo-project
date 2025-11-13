import mongoose, { Schema, Document, Types } from "mongoose";

export const TodoStatus = {
  Pending: "Pending",
  Completed: "Completed",
} as const;

export type TodoStatus = typeof TodoStatus[keyof typeof TodoStatus];

export interface ITodo extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  state: string,
  creationDate: Date;
  userId: string;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  state: { type: String, required: true, default: TodoStatus.Pending },
  creationDate: { type: Date, required: true, default: Date.now },
  userId: { type: String, required: true }
});

TodoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

TodoSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model<ITodo>("Todo", TodoSchema);

