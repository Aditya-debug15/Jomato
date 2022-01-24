import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox } from "@mui/material";
const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [sortName2, setSortName2] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [quantity, setquantity] = useState(0);
  const [price, setprice] = useState(0);
  const [ID, setID] = useState("");
  const [sellerID, setsellerID] = useState("");
  const [itemname, setitemname] = useState("");
  const [AddonArray2, setAddonArray2] = useState([]);
  let AddonArray = [];
  const handleClickOpen = (event) => {
    setOpen(true);
    let temp_Array = event.target.value.split(",")
    console.log(temp_Array[1])
    setprice(temp_Array[1])
    setID(String(temp_Array[0]))
    setsellerID(String(temp_Array[3]))
    setitemname(String(temp_Array[2]))
    console.log(ID)
  };

  const handleClose = () => {
    setOpen(false);
    setquantity(0);
    setprice(0);
    setID("");
    setsellerID("")
    setitemname("")
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/listitems")
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangequantity = (event) => {
    setquantity(event.target.value)
  }

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (new Date(a.price) - new Date(b.price));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };
  const sortChange2 = () => {
    let usersTemp = users;
    const flag = sortName2;
    usersTemp.sort((a, b) => {
      if (a.rating != undefined && b.rating != undefined) {
        return (1 - flag * 2) * (new Date(a.rating) - new Date(b.rating));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName2(!sortName2);
  };
  const AddFavour = (event) => {
    const NewFavour = {
      "email": localStorage.getItem('email'),
      "Favourite": event.target.value
    }
    console.log(NewFavour)
    axios
      .post("http://localhost:4000/user/addfavourite", NewFavour)
      .then((response) => {
        if (response.data.status === "Success") {
          if (response.data.newvalues.nModified == 0) {
            alert("Already in the list")
          }
          else {
            alert("Added !!")
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const PrepareOrder = (event) => {
    let Amount = 0;
    console.log(ID)
    Amount += Number(price);
    let second_array = [];
    console.log(AddonArray2.length);
    for (let i = 0; i < AddonArray2.length; i++) {
      console.log({ a: AddonArray2[i][0], b: ID });
      if (AddonArray2[i][0] === ID) {
        Amount += Number(AddonArray2[i][1][1])
        second_array.push(AddonArray2[i][1])
      }
    }
    let output = [];
    {
      let i, len
      for (i = 0, len = second_array.length; i < len; i++) {
        const newAddon = {
          Item: second_array[i][0],
          Price: second_array[i][1]
        }
        output.push(newAddon)
      }
    }
    Amount *= Number(quantity)
    const newOrder = {
      buyer: localStorage.getItem('email'),
      item_name: itemname,
      price: Amount,
      seller: sellerID,
      Addon: output,
      quantity: Number(quantity),
    };
    console.log(newOrder)
    axios
      .post("http://localhost:4000/user/order", newOrder)
      .then((response) => {
        if (response.data.status === "Success") {
          alert("Success")
        }
        else{
          alert(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setquantity(0)
    setOpen(false)
    setprice(0)
    setID("")
    setsellerID("")
    setitemname("")
    //console.log(event.target.id)
  }
  const onChangeCheckbox = (event) => {
    // console.log(event)
    // console.log(event.target.checked)
    // console.log(event.target.id)
    console.log(event.target.value)
    if (event.target.checked) {
      AddonArray.push([event.target.id, event.target.value.split(",")]);
    }
    else {
      AddonArray.splice(AddonArray.indexOf([event.target.id, event.target.value.split(",")]), 1);
    }
    // console.table(AddonArray[0][0])
    // console.table(AddonArray[0][1][0])
    // console.table(AddonArray[0][1][1])
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            // onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Salary
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price
                  </TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>{" "}
                    <Button onClick={sortChange2}>
                      {sortName2 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Rating</TableCell>
                  <TableCell>Veg / Non Veg</TableCell>
                  <TableCell>Seller name</TableCell>
                  <TableCell>Shop name</TableCell>
                  <TableCell>Addons</TableCell>
                  <TableCell>Add Favourite</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{user.price}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.rating}</TableCell>
                    <TableCell>{user.VegORnot}</TableCell>
                    <TableCell>{user.Seller[0].name}</TableCell>
                    <TableCell>{user.Seller[0].shop_name}</TableCell>
                    <TableCell>
                      {user.Addon.map((slip, i) => (  //added this bracket
                        <tr key={i}>
                          <td><Checkbox value={[slip.Item, slip.Price]} id={user._id} onChange={onChangeCheckbox} /></td>
                          <td>{slip.Item}</td>
                          <td>{slip.Price}</td>
                        </tr>
                      )
                      )}
                    </TableCell>
                    <TableCell><Button value={[user._id, user.price, user.name, user.Seller[0]._id]} onClick={(e) => { setAddonArray2(AddonArray); handleClickOpen(e); }}>Order</Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Enter Quantity</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Enter Quantity
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={quantity}
                            onChange={onChangequantity}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={PrepareOrder}>Order</Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell><Button value={user._id} onClick={AddFavour}><StarIcon /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;
