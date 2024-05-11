import React, { useState, useEffect } from "react";
import service from "../../appwrite/auth_service_doc";
import Container from "../container/Container";
import AllPosts from "./AllPosts";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.status);

  useEffect(() => {
    service.getPosts([]).then((post) => {
      if (post) setPosts(post);
    });
    setPosts([]);
  }, [status]);

  if (posts.length == 0) {
    return (
      <>
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  } else {
    return <AllPosts />;
  }
}

export default Home;
