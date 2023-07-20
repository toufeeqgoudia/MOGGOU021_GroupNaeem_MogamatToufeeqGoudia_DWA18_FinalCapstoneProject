import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const BottomNav = () => {
  const navigate = useNavigate()

  return (
    <nav className="fixed -bottom-0 -left-0 -right-0 h-10 flex justify-around bg-white z-10">
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon className="text-xl" />
        </Button>
        <Button onClick={() => navigate('/')}>
          <HomeIcon className="text-xl" />
        </Button>
        <Button>
          <StarBorderIcon className="text-xl" />
        </Button>
    </nav>
  );
}

export default BottomNav