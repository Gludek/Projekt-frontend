import { useCreatePost } from "@/API/hooks/PostHooks";
import RichTextInput from "@/components/Form/RichTextInput";
import Button from "@/components/Utils/StyledButton";
import { JSONContent } from "@tiptap/react";
import React from "react";
import styled from "styled-components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { debounce } from "@/Utils/debounce";
import { getBase64 } from "@/Utils/getBase64";
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function NewPost() {
  const [output, setOutput] = React.useState<JSONContent | null>(null);
  const mutation = useCreatePost();
  const methods = useForm();

  const onSubmit = async (data: {
    title: string;
    description: string;
    picture: File | File[];
  }) => {
    const { title, description, picture } = data;
    let pictures = [];
    let desc = description;
    if (!Array.isArray(picture)) {
      pictures.push(picture);
    } else {
      pictures = picture;
    }

    for (let i = 0; i < pictures.length; i++) {
      const base64 = (await getBase64(pictures[i])) as string;
      // console.log(desc.match(`<img src="${base64}" />`));
      desc = desc.replace(`<img src="${base64}">`, `{img:${i}}`);
    }
    console.log(title, desc, pictures);
    const post = new FormData();
    post.append("post[title]", title);
    post.append("post[description]", desc);
    pictures.forEach((pic, i) => post.append(`post[pictures][]`, pic));
    mutation.mutate(post);
    // Call your mutation function here with the data object
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          encType="multipart/form-data"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <input
            {...methods.register("title")}
            type="hidden"
            defaultValue={""}
          />
          <Controller
            control={methods.control}
            render={({ field }) => (
              <RichTextInput
                title={methods.getValues("title")}
                description={field.value}
                onChange={debounce((t: string) => {
                  const test = t.substring(0, t.indexOf("</h1>"));
                  methods.setValue("title", test.replace("<h1>", ""));
                  field.onChange(t.replace(test + "</h1>", ""));
                }, 500)}
              />
            )}
            name="description"
            defaultValue=""
          />
          <DevTool control={methods.control} /> {/* set up the dev tool */}
          <Button type="submit">Dodaj</Button>
        </Form>
      </FormProvider>
    </div>
  );
}

export default NewPost;
