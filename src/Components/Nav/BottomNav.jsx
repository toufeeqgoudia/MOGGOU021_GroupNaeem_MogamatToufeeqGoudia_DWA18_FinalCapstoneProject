import { Paper, BottomNavigation, Button } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Nav.css'

export default function BottomNav() {


    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation>
                <Button>
                    <RestoreIcon className="nav-icon" />
                </Button>
                <Button>
                    <StarBorderIcon className="nav-icon" />
                </Button>
            </BottomNavigation>
        </Paper>
    )
}