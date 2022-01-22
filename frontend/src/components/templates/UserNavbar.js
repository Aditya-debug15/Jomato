import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const UserNavbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Info
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/editprofile")}>
            Edit Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/ordernow")}>
            Order
          </Button>
          <Button color="inherit" onClick={() => navigate("/favourites")}>
            Favourites
          </Button>
          <Button color="inherit" onClick={() => navigate("/wallet")}>
            <AccountBalanceWalletIcon fontSize="small" />
          </Button>
          <Button color="inherit" onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserNavbar;
