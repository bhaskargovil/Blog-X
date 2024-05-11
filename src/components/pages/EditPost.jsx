import React, { useEffect, useState } from "react";
import service from "../../appwrite/auth_service_doc";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../container/Container";
import PostForm from "./PostForm";

function EditPost() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
