import {
  useCountSavedPost,
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/quaries-and-mutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

type PropsType = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PropsType) => {
  const likeList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);
  const [countSave, setCountSave] = useState(0);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  // Fetching the save count for the post
  const { mutate: countSavedPost, isPending: isCountLoading } =
    useCountSavedPost();

  // const handleSaveCount = () => {
  //   countSavedPost(post.$id, {
  //     onSuccess: (data) => {
  //       setCountSave(data || 0);
  //     },
  //     onError: (error) => {
  //       console.error("Error fetching save count:", error);
  //     },
  //   });
  // };

  // useEffect(() => {
  //   setIsSaved(!!savedPostRecord);
  //   handleSaveCount();
  // }, [currentUser, savedPostRecord, handleSaveCount]);

  useEffect(() => {
    const handleSaveCount = () => {
      countSavedPost(post.$id, {
        onSuccess: (data) => {
          setCountSave(data || 0);
        },
        onError: (error) => {
          console.error("Error fetching save count:", error);
        },
      });
    };

    setIsSaved(!!savedPostRecord);
    handleSaveCount(); // Fetch the save count when the component mounts or when `savedPostRecord` changes
  }, [currentUser, savedPostRecord, post.$id, countSavedPost]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likes: likesArray });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    // if (savedPostRecord) {
    //   setIsSaved(false);
    //   return deleteSavedPost(savedPostRecord.$id);
    // }

    // savePost({ userId: userId, postId: post.$id });
    // setIsSaved(true);

    if (savedPostRecord) {
      setIsSaved(false);
      console.log("filteredRecords: ", savedPostRecord.$id);
      deleteSavedPost({ savedRecordId: savedPostRecord.$id });
    } else {
      savePost({ postId: post.$id, userId: userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-2 py-3">
        <img
          src={`/assets/icons/${
            checkIsLiked(likes, userId) ? "liked" : "like"
          }.svg`}
          alt=""
          width="36"
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="text-3xl py-2 mx-3">{likes.length}</p>
      </div>

      <div className="flex gap-2 mr-2 py-3">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            src={`/assets/icons/${isSaved ? "saved" : "save"}.svg`}
            alt=""
            width="36"
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        )}
        <p className="text-3xl py-2 mx-3">
          {isCountLoading ? <Loader /> : countSave}
        </p>
      </div>
    </div>
  );
};

export default PostStats;
