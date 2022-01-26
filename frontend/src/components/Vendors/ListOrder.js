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
const ShowOrder = (props) => {
    const [details, setDetails] = useState([]);

    function createData(name, calories) {
        return { name, calories };
    }
    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/vendor/showorder", newuser)
            .then((response) => {
                setDetails(response.data.items);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const ChnageStatus = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        console.log(event.target.value)
        var next_status;
        if((event.target.value).localeCompare("Placed")===0)
        {
            next_status = "Accepted"
        }
        else{
            if((event.target.value).localeCompare("Accepted")===0)
            {
                next_status="Cooking"
            }
            else{
                if((event.target.value).localeCompare("Cooking")===0)
                {
                    next_status="Ready For Pickup"
                }
            }
        }
        const newUser = {
            email:localStorage.getItem('email'),
            id: event.target.id,
            status: next_status
        };
        console.log(newUser);
        axios
            .post("http://localhost:4000/vendor/changestatus", newUser)
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
    const RejectStatus = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        console.log(event.target.value)
        const newUser = {
            id: event.target.id,
            wallet: event.target.value
        };
        console.log(newUser);
        axios
            .post("http://localhost:4000/vendor/rejectstatus", newUser)
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
                            <TableCell>Buyer</TableCell>
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
                                    {row.buyer}
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
                                        (row.status).localeCompare("Placed") === 0 ? (
                                            <ul>
                                                <li><Button variant="contained" value={row.status} id={row._id} onClick={ ChnageStatus} size="small" startIcon={<SendIcon />} >Accept</Button></li>
                                                <li><Button variant="outlined" value={row.price} id={row._id} onClick={RejectStatus} size="small" startIcon={<DeleteIcon />}>Reject</Button></li>
                                            </ul>
                                        ) : (
                                            (row.status).localeCompare("Rejected") === 0 ? (
                                                <ul>
                                                    <li><Button variant="contained" disabled size="small" >Order Rejected</Button></li>
                                                </ul>
                                            ) : (
                                                (row.status).localeCompare("Completed") === 0 ? (
                                                    <ul>
                                                        <li><Button variant="contained" disabled size="small" >Order Completed</Button></li>
                                                    </ul>
                                                ) : 

                                                (
                                                    (row.status).localeCompare("Ready For Pickup") === 0 ? (
                                                        <ul>
                                                            <li><Button variant="contained" disabled size="small" >Waiting For Buyer</Button></li>
                                                        </ul>
                                                    ) : 
                                                    
                                                    (
                                                        <ul>
                                                            <li><Button variant="outlined" value={row.status} id={row._id} onClick={ChnageStatus} size="small" startIcon={<SendIcon />}>Next Stage</Button></li>
                                                        </ul>
                                                    )
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

export default ShowOrder;
