import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, TextField } from "@mui/material";

const GeneratedContent = () => {
  return (
    <Box
      sx={{
        padding: "10px 10px",
        marginTop: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        color: "#333333",
        boxShadow: "2px 4px 10px rgba(0,0,0,0.07)",
        fontSize: "0.9rem",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
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
          rows={4}
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
          <GeneratedContent key={i} />
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
