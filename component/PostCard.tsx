"use client";
import Image from "next/image";
import { useContext, useState, useRef } from "react";
import { ImageUrlContext } from "@/context/imageUrls.context";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  imageUrl: string;
  description: string;
  likeCount: number;
  comments: string[];
}

const PostCard = ({ imageUrl, description, likeCount, comments }: Props) => {
  const [heartClick, setHeartClick] = useState(false);
  const [heartCount, setHeartCount] = useState(-1);
  const [totalHeartCount, setTotalHeartCount] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [inputComment, setInputComment] = useState("");

  const { updateHeartCount, addComment } = useContext(ImageUrlContext);

  const handleHeartClick = () => {
    setHeartClick((preValue) => {
      const newHeartClick = !preValue;
      setHeartCount(() => {
        const newHeartCount = newHeartClick ? 1 : -1;
        setTotalHeartCount(() => {
          const newTotalHeartCount = totalHeartCount + newHeartCount;
          updateHeartCount(imageUrl, newTotalHeartCount);
          return newTotalHeartCount;
        });
        return newHeartCount;
      });
      return newHeartClick;
    });
  };

  const handleSubmitInputComment = () => {
    addComment(imageUrl, inputComment);
    setInputComment("");
  };

  return (
    <Card className="w-80  my-4">
      <CardContent>
        <Image width="300" height="200" src={imageUrl} alt="post" />
        <div className="flex items-center gap-3 my-2 ">
          <FavoriteBorderIcon
            className={`${likeCount && "text-red-500 "} cursor-pointer`}
            onClick={() => {
              handleHeartClick();
            }}
          />
          <ChatBubbleOutlineIcon
            className="cursor-pointer"
            onClick={() => {
              setShowComment(!showComment);
            }}
          />
        </div>
        {likeCount > 0 && (
          <p>
            {likeCount} <span>like</span>{" "}
          </p>
        )}
        {showComment && (
          <>
            {comments.map((comment) => (
              <p key={comment}>{comment}</p>
            ))}
            <div className="flex items-center gap-2">
              <TextField
                className="w-full"
                value={inputComment}
                onChange={(e: any) => {
                  setInputComment(e.target.value);
                }}
                id="Comment"
                label="Comment"
                variant="standard"
              />
              <SendIcon
                className="cursor-pointer"
                onClick={handleSubmitInputComment}
              />
            </div>
          </>
        )}
        <h1>{description}</h1>
      </CardContent>
    </Card>
  );
};

export default PostCard;
