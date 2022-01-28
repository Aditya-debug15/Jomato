// user ke orders
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
const ListOrder = (props) => {
    const [details, setDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState(0);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAge(0)
    };
    function createData(name, calories) {
        return { name, calories };
    }
    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/user/showorder", newuser)
            .then((response) => {
                setDetails(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const ChnageStatus = (event) => {
        event.preventDefault();
        const newUser = {
            id: event.target.id,
            status: "Completed"
        };
        console.log(newUser);
        axios
            .post("http://localhost:4000/user/changestatus", newUser)
            .then((response) => {
                if (response.data.done === "Success") {
                    alert("Success")
                    window.location.reload()
                }
                else {
                    alert(response.data.Msg)
                    console.log("error 1")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handlerate = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        const newUser = {
            id: event.target.id,
            rating:age
        };
        console.log(newUser);
        axios
            .post("http://localhost:4000/user/ratingchange", newUser)
            .then((response) => {
                if (response.data.done === "Success") {
                    window.location.reload()
                }
                else {
                    console.log("error 1")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        setAge(0)
    }
    return (
        <>
            <h1>Food Items</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Bill</TableCell>
                            <TableCell>Seller</TableCell>
                            <TableCell>quantity</TableCell>
                            <TableCell>Placed Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Addons</TableCell>
                            <TableCell>Functionality</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.map((row, key) => (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.item_name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.price}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.seller_info[0].name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.quantity}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.placed_time}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.status}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.Addon.map((slip, i) => (  //added this bracket
                                        <ul>
                                            <li>{slip.Item}</li>
                                        </ul>
                                    )
                                    )}
                                </TableCell>
                                <TableCell>
                                    {
                                        (row.status).localeCompare("Ready For Pickup") === 0 ? (
                                            <ul>
                                                <li><Button variant="contained" id={row._id} onClick={ChnageStatus} size="small" startIcon={<SendIcon />} >Picked Up</Button></li>
                                            </ul>
                                        ) : (
                                            (row.status).localeCompare("Completed") === 0 && row.rating === 0 ? (
                                                <ul>
                                                    <li><Button variant="outlined" onClick={handleClickOpen}>
                                                        Rate
                                                    </Button>
                                                        <Dialog open={open} onClose={handleClose}>
                                                            <DialogTitle>Rating</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Rate this food item
                                                                </DialogContentText>
                                                                <Box sx={{ minWidth: 120 }}>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={age}
                                                                            label="rate"
                                                                            onChange={handleChange}
                                                                        >
                                                                            <MenuItem value={1}>1</MenuItem>
                                                                            <MenuItem value={2}>2</MenuItem>
                                                                            <MenuItem value={3}>3</MenuItem>
                                                                            <MenuItem value={4}>4</MenuItem>
                                                                            <MenuItem value={5}>5</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose}>Cancel</Button>
                                                                <Button id={row._id} onClick={handlerate}>Rate</Button>
                                                            </DialogActions>
                                                        </Dialog></li>
                                                </ul>
                                            ) : (
                                                (row.status).localeCompare("Completed") === 0 && row.rating !== 0 ? (
                                                    <ul>
                                                        <Typography component="legend">Rated As</Typography>
                                                        <Rating name="read-only" value={row.rating} readOnly />
                                                    </ul>
                                                ) : (
                                                    null
                                                )
                                            )
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ListOrder;
