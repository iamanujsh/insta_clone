"use client";

import { useContext } from "react";
import PostCard from "./PostCard";
import { ImageUrlContext } from "@/context/imageUrls.context";

const PostList = () => {
  const { urls, allPosts } = useContext(ImageUrlContext);
  return (
    <>
      {allPosts?.map((url) => {
        return (
          <PostCard
            key={url.imageUrl}
            imageUrl={url.imageUrl}
            description={url.description}
            likeCount={url.heartCount}
            comments={url.comments}
          />
        );
      })}
    </>
  );
};

export default PostList;
