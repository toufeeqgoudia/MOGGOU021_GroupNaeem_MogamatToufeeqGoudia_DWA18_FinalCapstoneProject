import { useState } from "react";
import { supabase } from "../../Config/supabase";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";

const TopNav = () => {
  const [theme, setTheme] = useState("light");
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <nav className="fixed max-w-screen -top-0 -right-0 -left-0 h-12 flex justify-between items-center bg-white shadow-tn z-10">
      <div className="flex items-center">
        <img
          src="/PodHub-nav-logo.png"
          alt="PodHub Logo"
          className="w-24 h-12 rounded-xl pt-0.5 pb-1 pl-1"
        />
      </div>
      <div className="m-0">
        {theme ? (
          <Button onClick={() => toggleTheme("light")}>
            <LightModeIcon className="text-xl" />
          </Button>
        ) : (
          <Button onClick={() => toggleTheme("dark")}>
            <DarkModeIcon className="text-xl" />
          </Button>
        )}
        <Button onClick={handleDialog}>
          <AccountCircleIcon className="text-xl" />
        </Button>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialog}>
        <div className="w-72 h-44">
          <h3 className="text-lg m-1">Settings</h3>
          <Divider variant="fullWidth" />
          <div className="max-w-full flex flex-col justify-center items-center">
              <Button variant="contained" sx={{ width: '90%', height: '50px', marginTop: '10px' }} onClick={handleLogout}>Sign Out</Button>
              <Button variant="contained" sx={{ width: '90%', height: '50px', marginTop: '10px' }} onClick={handleDialog}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    </nav>
  );
};

export default TopNav;
