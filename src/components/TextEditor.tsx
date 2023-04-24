import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from 'markdown-it';
import ReactMarkdown from "react-markdown";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function TextEditor() {
  return (
    <MdEditor
      style={{ height: "calc(100vh - 65px)" }}
      renderHTML={(text) => mdParser.render(text)}
    />
  );
}
