import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

interface GeneratedContentProps {
    contentText: string
}
const GeneratedContent = ({contentText}: GeneratedContentProps) => {
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
      The ButtonBase component sets pointer-events: none; on disabled buttons,
      which prevents the appearance of a disabled cursor. The ButtonBase
      component sets pointer-events: none; on disabled buttons, which prevents
      the appearance of a disabled cursor.
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
  const list = () => (
    <Box sx={{ width: "35vw", p: 2 }} role="presentation">
      <Box>
        <TextField
          fullWidth
          placeholder="Write something to automatically generate content. Minimum input should be of atleast 10 words."
          multiline
          rows={5}
          className="aigenerator-textfield"
        />
        <Button
          variant="contained"
          fullWidth
          size="small"
          sx={{ marginTop: 1 }}
        >
          Generate
        </Button>
      </Box>
      <Box>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GeneratedContent key={i} contentText={i.toString()} />
        ))}
      </Box>
    </Box>
  );

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
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
