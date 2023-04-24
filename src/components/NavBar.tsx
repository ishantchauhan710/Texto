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

interface NavBarProps {
  setShowAiGenerator: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ setShowAiGenerator }: NavBarProps) {
  return (
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
            sx={{ transform: "scale(0.9)" }}
          >
            <MdKeyboardVoice />
          </IconButton>

          <IconButton
            sx={{ color: "#ffffff", marginRight: 2 }}
            onClick={() => setShowAiGenerator(true)}
          >
            <TbRobot />
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
  );
}
