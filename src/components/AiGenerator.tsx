import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import {
  Configuration,
  CreateCompletionResponseChoicesInner,
  OpenAIApi,
} from "openai";

interface GeneratedContentProps {
  contentText: string;
}
const GeneratedContent = ({ contentText }: GeneratedContentProps) => {
  return (
    <Box
      sx={{
        padding: "10px 10px",
        marginTop: "15px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        color: "#333333",
        border: "1px solid rgba(0,0,0,0.2)",
        boxShadow: "2px 6px 15px rgba(0,0,0,0.1)",
        fontSize: "0.9rem",
        cursor: "pointer",
        transition: "all 0.5s",
        "&:hover": {
          boder: "rgba(37, 99, 235,0.2)",
          backgroundColor: "rgba(37, 99, 235,0.2)",
        },
      }}
      onClick={() => {
        navigator.clipboard.writeText(contentText);
        toast("Text copied to clipboard", { type: "info" });
      }}
    >
      {contentText}
    </Box>
  );
};

interface AiGeneratorProps {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AiGenerator({
  showDrawer,
  setShowDrawer,
}: AiGeneratorProps) {
  const [inputAiText, setInputAiText] = useState("");
  const [loadingAiContent, setLoadingAiContent] = useState(false);
  const [generatedAiContent, setGeneratedAiContent] =
    useState<CreateCompletionResponseChoicesInner[]>();

  const generateAiContent = async () => {
    let inputText = inputAiText;

    if (loadingAiContent) {
      return;
    }

    if (!inputText) {
      toast("Input text cannot be empty", { type: "error" });
      return;
    }
    if (inputText.split(" ").length < 10) {
      toast("Input text should contain atleast ten words", { type: "error" });
      return;
    }

    setLoadingAiContent(true);

    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_AI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: inputText,
        max_tokens: 40,
        temperature: 0.9,
        n: 5,
        echo: true,
      });

      const content = response.data.choices;
      setGeneratedAiContent(content);
      setLoadingAiContent(false);
    } catch (e) {
      toast(
        "Unable to generate AI content, it seems your credits have crossed the daily usage limit",
        { type: "error" }
      );
      setLoadingAiContent(false);
    }
  };

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
          >
            <Box sx={{ width: "35vw", p: 2 }} role="presentation">
              <Box>
                <TextField
                  fullWidth
                  placeholder="Write something to automatically generate content. Minimum input should be of atleast 10 words."
                  multiline
                  rows={5}
                  className="aigenerator-textfield"
                  value={inputAiText}
                  onChange={(e) => setInputAiText(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{ marginTop: 1 }}
                  disabled={loadingAiContent}
                  onClick={() => generateAiContent()}
                >
                  {loadingAiContent ? "Loading..." : "Generate"}
                </Button>
              </Box>
              <Box>
                {generatedAiContent &&
                  generatedAiContent.map((content, i) => (
                    <GeneratedContent
                      key={i}
                      contentText={content.text ? content.text : "null"}
                    />
                  ))}
              </Box>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
