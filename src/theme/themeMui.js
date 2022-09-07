import { createTheme } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#ab7a5f"
        },
        defaultLayout: {
            colorIcon: "#48647f",
            colorTextFocus: "#48647f",
            background: "#decbc0",
            colorText:"#102a42",
            borderColor: "#453227",
            colorBtn: "#453227",
            hoverBtn: "#5f4435",
            colorIconNav: "#ab7a5f",
        },
        
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        defaultLayout: {
            colorIcon: "#fff",
            colorTextFocus: "#fff",
            background: "#324d67",
            colorText: "#fff",
            borderColor: "#fff",
            colorBtn: "#fff",
            hoverBtn: "#ccc",
            colorIconNav: "#ccc",
        },
        
    }
})
