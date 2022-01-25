import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import CreateUser from "./components/common/Register";
import Login from "./components/common/login";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import VendorNavbar from "./components/templates/VendorNavbar";
import UserNavbar from "./components/templates/UserNavbar";
import Vendoredit from "./components/Vendors/vendoredit";
import VendorProfile from "./components/Vendors/VendorProfile";
import ListItem from "./components/Vendors/ListItems";
import EditItem from "./components/Vendors/Item_edit";
import AddItem from "./components/Vendors/Add_item";
import UserProfile from "./components/users/UserProfile";
import Useredit from "./components/users/useredit";
import Wallet from "./components/users/wallet";
import Triallist from "./components/users/trial"
import ShowOrder from "./components/Vendors/ListOrder";
import ListOrder from "./components/users/showorder"
let logged = localStorage.getItem('loggedin');

const Layout = () => {
  if (logged !== '1') {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    );
  }
  else {
    let userType = localStorage.getItem('usertype');
    if (userType === 'Vendor') {
      console.log("Here");
      return (
        <div>
          <VendorNavbar />
          <div className="container">
            <Outlet />
          </div>
        </div>
      );
    }
    else {
      console.log("Here");
      return (
        <div>
          <UserNavbar />
          <div className="container">
            <Outlet />
          </div>
        </div>
      );
    }
  }
};

function App() {
  console.log(localStorage.getItem('loggedin'))
  if (logged !== '1') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<CreateUser />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else {
    if(localStorage.getItem('usertype')==='Vendor')
    {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/editVendor" element={<Vendoredit />} />
              <Route path="/profile" element={<VendorProfile />} />
              <Route path="/listitems" element={<ListItem />} />
              <Route path="/edititem" element={<EditItem />} />
              <Route path="/additem" element={<AddItem />} />
              <Route path="/showorder" element={<ShowOrder />} />
              </Route>
          </Routes >
        </BrowserRouter>
      )
    }
    else{
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/showorder" element={<ListOrder />} />
              <Route path="/trial" element={<Triallist />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/editprofile" element={<Useredit />} />
              <Route path="/wallet" element={<Wallet />} />
              </Route>
          </Routes >
        </BrowserRouter>
      )
    }
  };
}

export default App;
