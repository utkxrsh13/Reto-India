import { 
    Home as HomeIcon, 
    Assignment as AssignmentIcon,
    AccountCircle as AccountCircleIcon,
    Inventory as InventoryIcon,
    Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
export const SideBarData =[
    {
        icon :HomeIcon,
        heading :"DashBoard",
    },
    {
        icon :AssignmentIcon,
        heading :"Orders",
    },
    {
        icon :AccountCircleIcon,
        heading :"Customer",
    },
    
    {
        icon :InventoryIcon,
        heading :"Products",
    },
    {
        icon :ContactPageIcon,
        heading :"Contact",
    },
    {
        icon :GroupIcon,
        heading :"Users",
    },
    {
        icon :AddIcon,
        heading :"AddProducts",
    },
    
    
];

export const CardsData=[
    {
        title:"Sales",
        color:{
            background:"linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow:"0px 10px 20px 0px #e0c6f5",
        },
        barValue:70,
        value:"25,970",
        png:CurrencyRupeeIcon,
        series:[
            {
                name:"Sales",
                data:[31,40,28,51,42,109,100],
            },
        ],
    },
    {
        title:"Revenue",
        color:{
            background:"linear-gradient(180deg, #ff9a56 0%, #ffc078 100%)",
            boxShadow:"0px 10px 20px 0px #fcd5a5",
        },
        barValue:80,
        value:"25,970",
        png:CurrencyRupeeIcon,
        series:[
            {
                name:"Revenue",
                data:[31,40,28,51,42,109,100],
            },
        ],
    },
    {
        title:"Expenses",
        color:{
            background:"linear-gradient(180deg, #f8d568 0%,rgb(226, 186, 25) 100%)",
            boxShadow:" 0px 15px 30px 0px rgb(251, 207, 137)",
        },
        barValue:60,
        value:"25,970",
        png:CurrencyRupeeIcon,
        series:[
            {
                name:"Expenses",
                data:[31,40,28,51,42,109,100],
            },
        ],
    },
]

export const UpdatesData = [
    {
        img:AccountCircleIcon,
        name:"Ankit yadav",
        noti:"has ordered a table",
        time:"25 seconds ago",
    },
    {
        img:AccountCircleIcon ,
        name:"Ankit yadav",
        noti:"has ordered a  sofa.... 4 seater",
        time:"5 minutes ago",
    },
    {
        img:AccountCircleIcon ,
        name:"Gourav",
        noti:"has ordered a chair ....",
        time:"32 minutes ago",
    }
]

  

