import { useEffect, useState } from "react";

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => {
          return (
            <li>
              {post.title}: {post.body}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
