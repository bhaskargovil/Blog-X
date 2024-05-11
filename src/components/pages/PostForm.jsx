import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import RealTimeEditor from "../elements/RealTimeEditor";
import service from "../../appwrite/auth_service_doc";
import Select from "../elements/Select";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      title: "" || post?.title,
      content: "" || post?.content,
      slug: "" || post?.slug,
      status: "active" || post?.status,
    });
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.userData);

  // handling the submitted data by the user
  const submitHandler = async (data) => {
    if (post) {
      const file = data.featuredImage[0]
        ? await service.uploadFile(data.featuredImage[0]) // uploading the new file on the backend
        : null;
      if (file) {
        await service.deleteFile(post.featuredImage); // deleting the entire post
      }
      const updatedPost = await service.updatePost(post.$id, {
        // updating the post image by the uploaded file
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (updatedPost) {
        console.log(true);
        navigate(`/post/${updatedPost.$id}`); // navigating to view the new post
      }
    } else {
      const file = data.featuredImage[0]
        ? await service.uploadFile(data.featuredImage[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          title: data.title,
          featuredImage: data.featuredImage,
          content: data.content,
          slug: data.slug,
          status: data.status,
          userID: UserData.$id,
        });

        if (dbPost) {
          navigate("/all-posts");
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }

      return () => subscription.unsubscribe();
    });
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          {/* entering the title of the post */}
          <Input
            label="Title: "
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />

          {/* entering the slug(id) of the post, auto generated and can be changed by user */}
          <Input
            label="Slug: "
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shoudlValidate: true,
              });
            }}
          />

          {/* real time editor for writing the content */}
          <RealTimeEditor
            label="Content: "
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        {/* right side of the form */}
        <div className="w-1/3 px-2">
          {/* inserting the image */}
          <Input
            label="Featured Image: "
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("featuredImage", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={service.filePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          {/* putting status to show the blog */}
          <Select
            options={["active", "inactive"]}
            label="Status: "
            className="mb-4"
            {...register("status", { required: true })}
          />
          {/* submit button */}
          <Button
            type="submit"
            className="w-full"
            bgColor={post ? "bg-green-500" : undefined}
          >
            {post ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
