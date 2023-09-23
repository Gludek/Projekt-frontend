import { useCurrentEditor } from "@tiptap/react";
import React from "react";

function RTIPrevie() {
  const { editor } = useCurrentEditor();

  return <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>;
}

export default RTIPrevie;
