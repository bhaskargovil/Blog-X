import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RealTimeEditor({ name, control, label, defaultValue = "" }) {
  return (
    <>
      <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      </div>

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Editor
              apiKey="aj0gcwa7l2kbfyconf9cz0f4amyzjcuzo4ewpr4e6vmuhnm6"
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          );
        }}
      />
    </>
  );
}

export default RealTimeEditor;
