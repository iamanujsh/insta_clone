import { Schema, model, models, Document } from "mongoose";

export interface IPost extends Document {
  imageUrl: string;
  description: string;
  heartCount: number;
  comments: string[];
}

const PostSchema = new Schema({
  imageUrl: { type: String },
  description: { type: String },
  heartCount: { type: Number },
  comments: [{ type: String }],
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
