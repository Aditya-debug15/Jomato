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
const VendorProfile = (props) => {
    const [rows, setDetails] = useState([]);

    function createData(name, calories) {
        return { name, calories};
    }
    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/vendor/editgetprofile", newuser)
            .then((response) => {
                setDetails([
                    createData('Name', response.data[0].name),
                    createData('Contact Number', response.data[0].ContactNumber),
                    createData('Email Id', response.data[0].email),
                    createData('Shop Name', response.data[0].shop_name),
                    createData('Opening Time', response.data[0].OpenTime),
                    createData('Closing Time', response.data[0].CloseTime),
                ]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    return (
        <>
        <h1>Profile</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default VendorProfile;
