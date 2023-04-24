import React from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

interface TextEditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextEditor({ content, setContent }: TextEditorProps) {
  return (
    <MdEditor
      id="texto-document"
      style={{ height: "calc(100vh - 65px)" }}
      renderHTML={(text) => mdParser.render(text)}
      value={content}
      onChange={(e) => setContent(e.text)}
    />
  );
}
