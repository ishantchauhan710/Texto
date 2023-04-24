import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

export default function TextEditor() {
  return (
    <MdEditor
      id="texto-document"
      style={{ height: "calc(100vh - 65px)" }}
      renderHTML={(text) => mdParser.render(text)}
    />
  );
}
