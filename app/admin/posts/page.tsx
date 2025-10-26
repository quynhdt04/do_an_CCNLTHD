"use client";

import postService from "@/services/postService";
import { Post } from "@/types/post.type";
import { useEffect, useState } from "react";

export default function PostPage() {
   const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const res = await postService.getAll();
        if (res && res.posts) {
          setPosts(res.posts);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  console.log("posts: ", posts);

    return (
        <>
           
        </>
    )
}