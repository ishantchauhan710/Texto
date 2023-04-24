import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
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
}

export default function NavBar({
  setShowAiGenerator,
  setShowSpeechDialog,
  content,
}: NavBarProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const exportRaw = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = Date.now().toString() + ".txt";
    // For firefox
    document.body.appendChild(element);
    element.click();
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
            <Typography
              variant="h5"
              fontWeight={600}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Texto
            </Typography>

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
              onClick={() => exportRaw()}
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
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
