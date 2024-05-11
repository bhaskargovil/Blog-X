import React, { useState, useEffect } from "react";
import service from "../../appwrite/auth_service_doc";
import Container from "../container/Container";
import Postcard from "../elements/Postcard";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((postList) => {
      if (postList) setPosts(postList.documents);
    });
  }, []);

  return (
    <>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => {
              return (
                <div key={post.$id} className="p-2 w-1/4">
                  <Postcard {...post} />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
}

export default AllPosts;
