"use client";

import { useContext } from "react";
import PostCard from "./PostCard";
import { ImageUrlContext } from "@/context/imageUrls.context";

const PostList = () => {
  const { urls } = useContext(ImageUrlContext);
  return (
    <>
      {urls?.map((url) => {
        return (
          <PostCard
            imageUrl={url.imageUrl}
            description={url.description}
            likeCount={url.heartCount}
            comments={url.commets}
          />
        );
      })}
    </>
  );
};

export default PostList;
