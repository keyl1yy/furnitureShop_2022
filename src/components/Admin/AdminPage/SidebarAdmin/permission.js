import { Chair, Dashboard, EmergencyRecording, Equalizer, Person, ShoppingCart } from "@mui/icons-material";
const adminLink = "/admin"
export const permissionsAdminPage = [
    {
        name: "Dashboard",
        icon: <Dashboard/>,
        href: adminLink
    },
    {
        name: "Users",
        icon: <Person/>,
        href: `${adminLink}/users`
    },
    {
        name: "Order",
        icon: <ShoppingCart/>,
        href: `${adminLink}/order`
    },
    {
        name: "Statistic",
        icon: <Equalizer/>,
        href: `${adminLink}/statistic`
    },
    {
        name: "Product",
        icon: <Chair/>,
        href: `${adminLink}/product`
    },
    {
        name: "Meeting",
        icon: <EmergencyRecording/>,
        href: `${adminLink}/meeting`
    }
]