import Head from "next/head";
import { Inter } from "next/font/google";
import { Button } from "@mui/material";
import NavBar from "@/components/NavBar";
import TextEditor from "@/components/TextEditor";
import AiGenerator from "@/components/AiGenerator";
import { useState } from "react";
import SpeechDialog from "@/components/SpeechDialog";

export default function Home() {
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  const [showSpeechDialog, setShowSpeechDialog] = useState(false);
  const [content, setContent] = useState("");

  return (
    <>
      <Head>
        <title>Texto</title>
        <meta
          name="description"
          content="An AI based content generation tool"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <NavBar
          setShowAiGenerator={setShowAiGenerator}
          setShowSpeechDialog={setShowSpeechDialog}
          content={content}
        />
        <TextEditor content={content} setContent={setContent} />
        <AiGenerator
          showDrawer={showAiGenerator}
          setShowDrawer={setShowAiGenerator}
        />
        <SpeechDialog open={showSpeechDialog} setOpen={setShowSpeechDialog} />
      </main>
    </>
  );
}
