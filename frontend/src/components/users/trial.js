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
import Alert from '@mui/material/Alert';
import { bgcolor } from "@mui/system";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fuse from 'fuse.js';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
const Triallist = (props) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [sortName2, setSortName2] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [quantity, setquantity] = useState(0);
  const [price, setprice] = useState(0);
  const [ID, setID] = useState("");
  const [sellerID, setsellerID] = useState("");
  const [itemname, setitemname] = useState("");
  const [AddonArray2, setAddonArray2] = useState([]);
  const [searchParam] = useState(["name"]);
  const [user_favour, setuser_favour] = useState([]);
  const [vegcheck, setvegcheck] = useState(0);
  const [age, setAge] = useState('');
  const [price_min,setprice_min] = useState(0);
  const [price_max,setprice_max] = useState(1000);

  const [query, updateQuery] = useState('');
  const [searchedData,setsearchedData] = useState([]);
  function onSearch(event) {
    updateQuery(event.target.value);
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChangeveg = (event) => {
    setvegcheck(event.target.value);
  };
  const handleprice_min = (event) =>{
    setprice_min(event.target.value)
  };
  const handleprice_max = (event) =>{
    setprice_max(event.target.value)
  };
  let AddonArray = [];
  var today = new Date()
  var current_time;
  var hour, minute;
  if (today.getHours() < 10) {
    hour = '0' + today.getHours()
  }
  else {
    hour = today.getHours()
  }
  if (today.getMinutes() < 10) {
    minute = '0' + today.getMinutes()
  }
  else {
    minute = today.getMinutes()
  }
  current_time = hour + ':' + minute
  console.log(current_time)
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
  const handleClickOpen1 = (event) => {
    setOpen1(true);
    const NewFavour = {
      "email": localStorage.getItem('email')
    }
    axios
      .post("http://localhost:4000/user/getfavourite", NewFavour)
      .then((response) => {
        if (response.data.status !== "Failed") {
          setuser_favour(response.data[0].user_favour)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/listitems")
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
        setsearchedData(response.data)
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
    setSearchText(event.target.value);
    const fuse = new Fuse(users,{
      keys:["name"]
    });
    const results = fuse.search(searchText);
    const finalResult = [];
    console.log(results)
    if(results.length){
      for(let i=0;i<results.length;i++)
      {
        finalResult.push(results[i].item)
      }
      setsearchedData(finalResult)
    }
    else{
      setsearchedData(users)
    }
    console.log(searchedData)
  };

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1
        );
      });
    });
  }

  function check_function(VegORnot){
    if(vegcheck===0 || (vegcheck===1 && VegORnot==="Veg") || (vegcheck===2 && VegORnot==="Non Veg"))
    {
      return true
    }
    else{
      return false
    }
  }

  function check_function_2(Price)
  {
    if(Price>=price_min && Price<=price_max)
    {
      return true
    }
    else{
      return false
    }
  }

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
    var today = new Date()
    var placed_time;
    if (today.getMinutes() < 10) {
      placed_time = today.getHours() + ':0' + today.getMinutes() + ':' + today.getSeconds()
    }
    else {
      placed_time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    }
    const newOrder = {
      buyer: localStorage.getItem('email'),
      item_name: itemname,
      price: Amount,
      seller: sellerID,
      Addon: output,
      quantity: Number(quantity),
      placed_time: placed_time
    };
    console.log(newOrder)
    axios
      .post("http://localhost:4000/user/order", newOrder)
      .then((response) => {
        if (response.data.status === "Success") {
          <Alert severity="success">Success</Alert>
        }
        else {
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
    window.location.href = "/"
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
              value={searchText}
              onChange={customFunction}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton value={searchText} onTouchTap={customFunction}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}

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
                  Filter By Price
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    value={price_min}
                    onChange={handleprice_min}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                    value={price_max}
                    onChange={handleprice_max}
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
           <ListItem>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Veg/NonVeg</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={vegcheck}
                  label="Veg/NonVeg"
                  onChange={handleChangeveg}
                >
                  <MenuItem value={0}>{"Both"}</MenuItem>
                  <MenuItem value={1}>Veg</MenuItem>
                  <MenuItem value={2}>Non Veg</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ColorButton variant="contained" onClick={(e) => { handleClickOpen1(e); }}>Show Favourite</ColorButton>
              <Dialog open={open1} onClose={handleClose1}>
                <DialogTitle>Favourite</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Favourite
                  </DialogContentText>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Shop Name</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  {user_favour.map((user, ind) => (
                    <TableRow key={ind}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.shop_name}</TableCell>
                      <TableCell>{user.price}</TableCell>
                    </TableRow >
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose1}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
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
                  <TableCell>Tags</TableCell>
                  <TableCell>Addons</TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>Add Favourite</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedData.map((user, ind) => (
                  (user.Seller[0].OpenTime).localeCompare(user.Seller[0].CloseTime) === -1 && (user.Seller[0].OpenTime).localeCompare(current_time) === -1 && (current_time).localeCompare(user.Seller[0].CloseTime) === -1  && check_function(user.VegORnot) && check_function_2(user.price) ? (
                    <TableRow key={ind}>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.rating}</TableCell>
                      <TableCell>{user.VegORnot}</TableCell>
                      <TableCell>{user.Seller[0].name}</TableCell>
                      <TableCell>{user.Seller[0].shop_name}</TableCell>
                      <TableCell>{user.tags.join(",")}</TableCell>
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
                              type="Number"
                              margin="dense"
                              id="name"
                              label="Number"
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
                  ) : null
                ))}
                {searchedData.map((user, ind) => (
                  ((user.Seller[0].OpenTime).localeCompare(current_time) === 1 || (current_time).localeCompare(user.Seller[0].CloseTime) === 1) && check_function(user.VegORnot) && check_function_2(user.price) ? (
                    <TableRow bgcolor="lightgray" key={ind}>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.rating}</TableCell>
                      <TableCell>{user.VegORnot}</TableCell>
                      <TableCell>{user.Seller[0].name}</TableCell>
                      <TableCell>{user.Seller[0].shop_name}</TableCell>
                      <TableCell>{user.tags.join(",")}</TableCell>
                      <TableCell>
                        {user.Addon.map((slip, i) => (  //added this bracket
                          <tr key={i}>
                            <td><Checkbox value={[slip.Item, slip.Price]} id={user._id} disabled onChange={onChangeCheckbox} /></td>
                            <td>{slip.Item}</td>
                            <td>{slip.Price}</td>
                          </tr>
                        )
                        )}
                      </TableCell>
                      <TableCell><Button value={[user._id, user.price, user.name, user.Seller[0]._id]} disabled={true} onClick={(e) => { setAddonArray2(AddonArray); handleClickOpen(e); }}>Order</Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Enter Quantity</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Enter Quantity
                            </DialogContentText>
                            <TextField
                              autoFocus
                              type="Number"
                              margin="dense"
                              id="name"
                              label="Number"
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
                  ) : null
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Triallist;
