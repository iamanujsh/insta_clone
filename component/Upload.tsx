"use client";
import Button from "@mui/material/Button";
import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import { useContext, useState } from "react";
import { ImageUrlContext } from "@/context/imageUrls.context";

interface Props {
  setImageUrl: (url: string) => {};
}

const Upload = ({ setImageUrl }: Props) => {
  const [info, setInfo] = useState<string[]>([]);

  const { setUrls, urls, addImageUrl } = useContext(ImageUrlContext);

  const getCldUrlFunction = (url: any) => {
    const cldUrl = getCldImageUrl({
      src: url?.public_id,
      width: 960,
      height: 600,
    });
    setInfo((prevUrl) => [...prevUrl, cldUrl]);
    setImageUrl(cldUrl);
    addImageUrl(cldUrl);
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="insta_post"
        onSuccess={(result, { widget }) => {
          getCldUrlFunction(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          function handleClick() {
            open();
          }
          return (
            <>
              <Button variant="outlined" onClick={() => open()}>
                Upload Photo
              </Button>
            </>
          );
        }}
      </CldUploadWidget>
      {/* {info &&
        info.map((url) => (
          <Image key={url} width="300" height="200" src={url} alt="post" />
        ))} */}
    </>
  );
};

export default Upload;
