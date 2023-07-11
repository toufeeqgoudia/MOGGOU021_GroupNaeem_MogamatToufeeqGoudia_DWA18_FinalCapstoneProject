import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Nav.css';

export default function BottomNav() {
  return (
    <nav className="bot-nav">
        <Button>
          <ArrowBackIcon className="nav-icon" />
        </Button>
        <Button>
          <HomeIcon className="nav-icon" />
        </Button>
        <Button>
          <StarBorderIcon className="nav-icon" />
        </Button>
    </nav>
  );
}
