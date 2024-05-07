"use client";

import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Upload from "./Upload";
import Image from "next/image";
import { ImageUrlContext } from "@/context/imageUrls.context";
import { addDescription } from "@/lib/actions/post.action";

const PostDialog = () => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const { urls, setUrls } = useContext(ImageUrlContext);

  const updateDesciption = (imageUrl: string, description: string) => {
    const newUrls = urls?.map((url) =>
      url.imageUrl === imageUrl ? { ...url, description } : url
    );

    setUrls(newUrls);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog
        open={open}
        onClose={handleClickClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const description = formJson.description;

            updateDesciption(imageUrl, description);

            //Calling my mongodb Post Schema for findind data based on imageUrl and update the description
            addDescription({ imageUrl, description });
            handleClickClose();
            setImageUrl("");
          },
        }}
      >
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Upload setImageUrl={setImageUrl} />
          {imageUrl && (
            <Image width="300" height="200" src={imageUrl} alt="post" />
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button type="submit">Upload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostDialog;
