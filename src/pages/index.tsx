import Head from "next/head";
import { Inter } from "next/font/google";
import { Button } from "@mui/material";
import NavBar from "@/components/NavBar";
import TextEditor from "@/components/TextEditor";
import AiGenerator from "@/components/AiGenerator";
import { useState } from "react";

export default function Home() {
  const [showAiGenerator, setShowAiGenerator] = useState(true);

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
        <NavBar setShowAiGenerator={setShowAiGenerator} />
        <TextEditor />
        <AiGenerator
          showDrawer={showAiGenerator}
          setShowDrawer={setShowAiGenerator}
        />
      </main>
    </>
  );
}
