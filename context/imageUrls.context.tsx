"use client";
import { createContext, useState, Dispatch, SetStateAction } from "react";

interface Url {
  imageUrl: string;
  description: string;
  heartCount: number;
  commets: string[];
}

interface ImageUrlContextType {
  urls: Url[] | null;
  setUrls: Dispatch<SetStateAction<Url[] | null>>;
  addImageUrl: (url: string, description?: string) => void;
  updateHeartCount: (url: string, heartCount: number) => void;
  addComment: (url: string, comment: string) => void;
}

export const ImageUrlContext = createContext<ImageUrlContextType>({
  urls: null,
  setUrls: () => {},
  addImageUrl: () => {},
  updateHeartCount: () => {},
  addComment: () => {},
});

export const ImageUrlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [urls, setUrls] = useState<Url[] | null>(null);

  const addImageUrl = (
    url: string,
    description: string = "",
    heartCount: number = 0,
    commets: string[] = []
  ) => {
    setUrls((prevUrls) => [
      ...(prevUrls || []),
      { imageUrl: url, description, heartCount, commets },
    ]);
  };

  const updateHeartCount = (imageUrl: string, heartCount: number) => {
    const newUpdateCount = urls?.map((url) =>
      url.imageUrl === imageUrl ? { ...url, heartCount } : url
    );

    setUrls(newUpdateCount || []);
  };

  const addComment = (imageUrl: string, comment: string) => {
    const newUpdateComment = urls?.map((url) =>
      url.imageUrl === imageUrl
        ? { ...url, commets: [...url.commets, comment] }
        : url
    );
    setUrls(newUpdateComment || []);
  };

  const value = { urls, setUrls, addImageUrl, updateHeartCount, addComment };
  return (
    <ImageUrlContext.Provider value={value}>
      {children}
    </ImageUrlContext.Provider>
  );
};
