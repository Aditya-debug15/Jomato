import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const VendorNavbar = () => {
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
            Welcome Page
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/profile")}>
            View Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/editVendor")}>
            Edit Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/AddItem")}>
            Add Item
          </Button>
          <Button color="inherit" onClick={() => navigate("/ViewOrder")}>
            View Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/listitems")}>
            View Food Items
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

export default VendorNavbar;
