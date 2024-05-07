"use client";
import {
  addCommentServer,
  addHeart,
  createPost,
  getAllPost,
} from "@/lib/actions/post.action";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface Url {
  imageUrl: string;
  description: string;
  heartCount: number;
  comments: string[];
}

interface ImageUrlContextType {
  urls: Url[] | null;
  setUrls: Dispatch<SetStateAction<Url[] | null>>;
  addImageUrl: (url: string, description?: string) => void;
  updateHeartCount: (url: string, heartCount: number) => void;
  addComment: (url: string, comment: string) => void;
  allPosts: Url[] | null;
  setAllPosts: Dispatch<SetStateAction<Url[] | null>>;
}

export const ImageUrlContext = createContext<ImageUrlContextType>({
  urls: null,
  setUrls: () => {},
  addImageUrl: () => {},
  updateHeartCount: () => {},
  addComment: () => {},
  allPosts: null,
  setAllPosts: () => {},
});

export const ImageUrlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [urls, setUrls] = useState<Url[] | null>(null);

  //Getting Post from server and store them here
  const [allPosts, setAllPosts] = useState<Url[] | null>(null);

  const getAllPostFromDB = async () => {
    try {
      const allPost = await getAllPost();
      setAllPosts(allPost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPostFromDB();
  }, [urls]);

  const addImageUrl = (
    url: string,
    description: string = "",
    heartCount: number = 0,
    comments: string[] = []
  ) => {
    setUrls((prevUrls) => [
      ...(prevUrls || []),
      { imageUrl: url, description, heartCount, comments },
    ]);

    createPost({ url, description, heartCount, comments });
  };

  const updateHeartCount = (imageUrl: string, heartCount: number) => {
    const newUpdateCount = urls?.map((url) =>
      url.imageUrl === imageUrl ? { ...url, heartCount } : url
    );

    addHeart({ imageUrl, heartCount });
    setUrls(newUpdateCount || []);
  };

  const addComment = (imageUrl: string, comment: string) => {
    const newUpdateComment = urls?.map((url) =>
      url.imageUrl === imageUrl
        ? { ...url, comments: [...url.comments, comment] }
        : url
    );

    addCommentServer({ imageUrl, comment });
    setUrls(newUpdateComment || []);
  };

  const value = {
    urls,
    setUrls,
    addImageUrl,
    updateHeartCount,
    addComment,
    allPosts,
  };
  return (
    <ImageUrlContext.Provider value={value}>
      {children}
    </ImageUrlContext.Provider>
  );
};
