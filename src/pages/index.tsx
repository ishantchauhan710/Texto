import Head from "next/head";
import { Inter } from "next/font/google";
import { Button } from "@mui/material";
import NavBar from "@/components/NavBar";
import TextEditor from "@/components/TextEditor";
import AiGenerator from "@/components/AiGenerator";
import { useEffect, useState } from "react";
import SpeechDialog from "@/components/SpeechDialog";
import DrawerMenu from "@/components/DrawerMenu";

export default function Home() {
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  const [showSpeechDialog, setShowSpeechDialog] = useState(false);
  const [content, setContent] = useState("");
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);

  useEffect(() => {
    const cache = localStorage.getItem("data");
    if (cache && cache.length > 0) {
      setContent(cache);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", content);
  }, [content]);

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
          setShowDrawerMenu={setShowDrawerMenu}
        />
        <TextEditor content={content} setContent={setContent} />
        <AiGenerator
          showDrawer={showAiGenerator}
          setShowDrawer={setShowAiGenerator}
        />
        <SpeechDialog open={showSpeechDialog} setOpen={setShowSpeechDialog} />
        <DrawerMenu
          showDrawerMenu={showDrawerMenu}
          setShowDrawerMenu={setShowDrawerMenu}
        />
      </main>
    </>
  );
}
