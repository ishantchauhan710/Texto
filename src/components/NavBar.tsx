import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, TextField } from "@mui/material";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { TbRobot } from "react-icons/tb";
import { MdKeyboardVoice } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface NavBarProps {
  setShowAiGenerator: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSpeechDialog: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setShowDrawerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({
  setShowAiGenerator,
  setShowSpeechDialog,
  content,
  setShowDrawerMenu,
}: NavBarProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [fileName, setFileName] = React.useState("Texto");
  const [downloadingPdf, setDownloadingPdf] = React.useState(false);

  const downloadRaw = () => {
    if (!content || content.length == 0) {
      alert("Unable to save empty document");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([content], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName + ".txt";
    // For firefox
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const downloadPdf = async () => {
    if (!content || content.length == 0) {
      alert("Unable to save empty document");
      return;
    }

    setDownloadingPdf(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: fileName, data: content }),
      });

      const element = document.createElement("a");
      const file = await response.blob();
      element.href = URL.createObjectURL(file);
      element.download = fileName;
      // For firefox
      document.body.appendChild(element);
      element.click();
      element.remove();
    } catch (err) {
      alert(err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <>
      {!browserSupportsSpeechRecognition && (
        <Box sx={{ background: "#f97316", color: "white", padding: "4px 0px" }}>
          Your browser does not support speech recognition
        </Box>
      )}
      <Box sx={{ flexGrow: 1, height: "65px" }}>
        <AppBar position="static" elevation={3}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setShowDrawerMenu(true)}
            >
              <MenuIcon />
            </IconButton>
            <input
              type="text"
              className="navbar-file-name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              spellCheck={false}
            />

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ transform: "scale(0.9)", marginRight: "-5px" }}
              onClick={() => setShowSpeechDialog(true)}
            >
              <MdKeyboardVoice />
            </IconButton>

            <IconButton
              sx={{ color: "#ffffff" }}
              onClick={() => setShowAiGenerator(true)}
            >
              <TbRobot />
            </IconButton>

            <IconButton
              sx={{ color: "#ffffff", marginRight: 2 }}
              onClick={() => downloadRaw()}
            >
              <BiCodeAlt />
            </IconButton>

            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "rgba(255,255,255,1)",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
              }}
              startIcon={<FaCloudDownloadAlt />}
              onClick={() => downloadPdf()}
              disabled={downloadingPdf}
            >
              {downloadingPdf ? "Wait" : "Save"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
