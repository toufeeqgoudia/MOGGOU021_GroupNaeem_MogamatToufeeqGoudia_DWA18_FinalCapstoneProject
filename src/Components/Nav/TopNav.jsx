import { Button } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopNav = () => {


    return (
        <nav className="fixed max-w-screen -top-0 -right-0 -left-0 h-12 flex justify-between items-center bg-white shadow-tn z-10">
            <div className="flex items-center">
                <img src="/PodHub-nav-logo.png" alt="PodHub Logo" className="w-24 h-12 rounded-xl pt-0.5 pb-1 pl-1" />
            </div>
            <div className="m-0">
                <Button>
                    <LightModeIcon className="text-xl" />
                </Button>
                <Button>
                    <DarkModeIcon className="text-xl" />
                </Button>
                <Button>
                    <AccountCircleIcon className="text-xl" />
                </Button>
            </div>
        </nav>
    )
}

export default TopNav