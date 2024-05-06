import PostCard from "@/component/PostCard";
import PostDialog from "@/component/PostDialog";
import PostList from "@/component/PostList";
import Upload from "@/component/Upload";

export default function Home() {
  return (
    <main className="p-20 flex flex-col justify-center items-center">
      {/* <Upload /> */}

      <div className="mb-10">
        <PostDialog />
      </div>
      <PostList />
      {/* <PostCard /> */}
    </main>
  );
}
