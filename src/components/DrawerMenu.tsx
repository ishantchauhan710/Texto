import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, TextField } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface DrawerMenuProps {
  showDrawerMenu: boolean;
  setShowDrawerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DrawerMenu({
  showDrawerMenu,
  setShowDrawerMenu,
}: DrawerMenuProps) {
  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={showDrawerMenu}
            onClose={() => setShowDrawerMenu(false)}
          >
            <Box sx={{ width: "25vw", p: 2 }} role="presentation">
              <List>
                <ListItem
                  disablePadding
                  onClick={() => {
                    setShowDrawerMenu(false);
                    alert("Texto Version 1.0");
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  onClick={() => {
                    setShowDrawerMenu(false);
                    window.open(
                      "https://www.github.com/ishantchauhan710/Texto"
                    );
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary="Source Code" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
