import RichTextInput from "@/components/Form/RichTextInput";
import { JSONContent } from "@tiptap/react";
import React from "react";

function NewPost() {
  const [output, setOutput] = React.useState<JSONContent | null>(null);
  return (
    <div>
      <RichTextInput setOutput={setOutput} />
    </div>
  );
}

export default NewPost;
