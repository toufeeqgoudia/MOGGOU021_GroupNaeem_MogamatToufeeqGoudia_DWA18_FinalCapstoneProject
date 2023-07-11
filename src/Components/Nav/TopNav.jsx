import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Nav.css'

export default function TopNav() {


    return (
        <nav className="nav-container">
            <div className="left-container">
                <img src="/PodHub-nav-logo.png" alt="PodHub Logo" className="logo-img" />
            </div>
            <div className="right-container">
                <Button>
                    <SearchIcon className="nav-icon" />
                </Button>
                <Button>
                    <AccountCircleIcon className="nav-icon" />
                </Button>
            </div>
        </nav>
    )
}