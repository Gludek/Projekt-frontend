import { EditorProvider, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";
import RTIPrevie from "./RTIPrevie";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import RTIMenuBar from "./RTIComponents/RTIMenuBar";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
const CustomDocument = Document.extend({
  content: "heading block*",
});
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  CustomDocument,
  StarterKit.configure({
    document: false,
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      console.log(
        node,
        node.attrs.level,
        node.type.name,
        node.type.name === "heading" && node.attrs.level === 1
      );
      if (node.type.name === "heading" && node.attrs.level === 1) {
        return "Tytuł";
      }

      return "Treśc";
    },
  }),
  ,
  Typography,
];

const StyledEditor = styled.div`
  > div:nth-child(2) {
    border: 1px solid black !important;
    padding: 20px;
    min-height: 500px;
    display: flex;
    div,
    input {
      flex: 1;
      border: none;
      outline: none;
    }
  }
  .tiptap .is-empty::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;
function RichTextInput({ setOutput }: { setOutput: (a: JSONContent) => void }) {
  return (
    <StyledEditor>
      <EditorProvider
        extensions={extensions}
        slotBefore={<RTIMenuBar />}
        onUpdate={({ editor }) => setOutput(editor.getHTML())}
      >
        <RTIPrevie />
      </EditorProvider>
    </StyledEditor>
  );
}

export default RichTextInput;
