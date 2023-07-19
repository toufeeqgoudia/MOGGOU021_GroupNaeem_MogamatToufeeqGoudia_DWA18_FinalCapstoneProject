import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function BottomNav() {
  return (
    <nav className="fixed -bottom-0 -left-0 -right-0 flex justify-around bg-white shadow-bn">
        <Button>
          <ArrowBackIcon className="text-xl" />
        </Button>
        <Button>
          <HomeIcon className="text-xl" />
        </Button>
        <Button>
          <StarBorderIcon className="text-xl" />
        </Button>
    </nav>
  );
}
