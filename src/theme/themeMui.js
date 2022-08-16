import { createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: orange[500]
        }
    },
    // palette: {
    //     mode: "dark",

    // }
})

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: green[500]
        }
    }
})
