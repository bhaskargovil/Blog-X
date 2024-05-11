import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/auth_service_doc";
import Container from "../container/Container";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Button from "../elements/Button";

function Post() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const isAuthor = post && userData ? userData.$id === post.userID : false;

  return (
    <div className="py-8">
      <Container>
        {/* file preview image */}
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.filePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>

        {/* checks whether to display the edit and delete button or not */}
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}

        {/* post title */}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        {/* displays the content of the post in react elements */}
        <div className="browser-css">{parse(String(post.content))}</div>
      </Container>
    </div>
  );
}

export default Post;
