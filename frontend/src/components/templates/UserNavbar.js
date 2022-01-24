import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import { useState, useEffect } from "react";
const UserNavbar = () => {
  const navigate = useNavigate();
  const [wallet,setwallet] = useState(0);
  useEffect(() => {
    const newuser = {
        email: localStorage.getItem('email')
    }
    axios
        .post("http://localhost:4000/user/editgetprofile", newuser)
        .then((response) => {
            setwallet(response.data[0].wallet)
        })
        .catch(function (error) {
            console.log(error);
        });
}, []);

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
            {wallet}
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
