import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Box, TextField } from "@mui/material";

interface SpeechDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpeechDialog({ open, setOpen }: SpeechDialogProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box minWidth={500} sx={{ padding: 2 }}>
          <h2>Speak and Write</h2>
          <p>Status: {listening ? "Listening" : "Off"}</p>
          <Box sx={{ margin: "10px 0px" }}>
            {!listening && (
              <Button
                sx={{ marginRight: 1 }}
                variant="contained"
                size="small"
                onClick={() =>
                  SpeechRecognition.startListening({ continuous: true })
                }
              >
                Start
              </Button>
            )}
            {listening && (
              <Button
                sx={{ marginRight: 1 }}
                variant="contained"
                size="small"
                color="success"
                onClick={SpeechRecognition.stopListening}
              >
                Stop
              </Button>
            )}
            <Button variant="contained" size="small" onClick={resetTranscript}>
              Reset
            </Button>
          </Box>
          <TextField
            placeholder="Click on the start button and speak something!"
            fullWidth
            multiline
            maxRows={6}
            value={transcript}
          />
        </Box>
      </Dialog>
    </div>
  );
}
