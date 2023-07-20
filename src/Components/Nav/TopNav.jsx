import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopNav = () => {


    return (
        <nav className="fixed -top-0 -right-0 -left-0 h-12 flex justify-between items-center bg-white shadow-tn z-10">
            <div className="flex items-center">
                <img src="/PodHub-nav-logo.png" alt="PodHub Logo" className="w-24 h-12 rounded-xl pt-0.5 pb-1 pl-1" />
            </div>
            <div className="m-0">
                <Button>
                    <SearchIcon className="text-xl" />
                </Button>
                <Button>
                    <AccountCircleIcon className="text-xl" />
                </Button>
            </div>
        </nav>
    )
}

export default TopNav