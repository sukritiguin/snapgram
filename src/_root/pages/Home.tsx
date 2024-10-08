import PostCard from "@/components/shared/PostCard";
import { useRecentPosts } from "@/lib/react-query/quaries-and-mutations";
import { Models } from "appwrite";
import { Divide, Loader } from "lucide-react";
import React from "react";

function Home() {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
