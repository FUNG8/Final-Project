import { Box, Button, Chip, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../theme/ThemeContextProvider";

const NightModeToggle = () => {
    const { mode, toggleColorMode } = useThemeContext();

    return (

        <Button
            onClick={toggleColorMode}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                color: "text.primary",
              
                border: "1px solid",
                borderRadius: 25,
                height: 12,
                p: 2,
                "&:hover": {
                    cursor: "pointer",

                },
            }}
        >

            {mode} mode
            <IconButton sx={{ ml: 1 }} color="inherit">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Button>
    );
};

export default NightModeToggle;