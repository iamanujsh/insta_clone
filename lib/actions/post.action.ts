"use server";

import Post from "@/database/post.model";
import { connectToDatabase } from "../mongoose";

export async function createPost(params: any) {
  try {
    connectToDatabase();

    const { url, description, heartCount, comments } = params;

    const post = await Post.create({
      imageUrl: url,
      description,
      heartCount,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addDescription(params: any) {
  try {
    connectToDatabase();

    const { imageUrl, description } = params;
    console.log(imageUrl);
    console.log(description);

    const updatePost = await Post.findOneAndUpdate(
      { imageUrl },
      { $set: { description } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function addHeart(params: any) {
  try {
    connectToDatabase();

    const { imageUrl, heartCount } = params;

    const updateHeart = await Post.findOneAndUpdate(
      { imageUrl },
      { $set: { heartCount } },
      { new: true }
    );
  } catch (error) {}
}

export async function addCommentServer(params: any) {
  try {
    connectToDatabase();

    const { imageUrl, comment } = params;
    console.log(comment);

    const updateComment = await Post.findOneAndUpdate(
      { imageUrl },
      { $push: { comments: comment } },
      { new: true }
    );
  } catch (error) {}
}

export async function getAllPost() {
  try {
    connectToDatabase();

    const allPost = await Post.find({}).lean();
    console.log(allPost);

    return allPost;
  } catch (error) {}
}
