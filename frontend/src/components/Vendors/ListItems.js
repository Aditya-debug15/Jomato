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
const EditItem = (props) => {
    const [details, setDetails] = useState([]);

    function createData(name, calories) {
        return { name, calories };
    }
    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/vendor/listitem", newuser)
            .then((response) => {
                setDetails(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: localStorage.getItem('email'),
            name: event.target.value
        };
        console.log(newUser);
        axios
            .post("http://localhost:4000/vendor/removeitem", newUser)
            .then((response) =>{
                if(response.data.status === "Success")
                {
                    window.location.reload()
                }
                else{
                    console.log("error 1")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onEdit = (event) => {
        event.preventDefault();
        localStorage.setItem('item_name',event.target.value);
        window.location.href = "/edititem";
    }
    return (
        <>
            <h1>Food Items</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>price</TableCell>
                            <TableCell>tags</TableCell>
                            <TableCell>ratings</TableCell>
                            <TableCell>VEG / NONVEG</TableCell>
                            <TableCell>Addons</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.map((row, key) => (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.price}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.tags.join(",")}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.rating}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.VegORnot}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.Addon.map((slip, i) => (  //added this bracket
                                        <tr key={i}>
                                            <td>{slip.Item}</td>
                                            <td>{slip.Price}</td>
                                        </tr>
                                    )
                                    )}
                                </TableCell>
                                <TableCell>
                                    <ul>
                                    <li><button variant="contained" onClick={onEdit} value={row.name} >Edit</button></li>
                                    <li><button variant="contained" onClick={onSubmit} value={row.name} >Remove</button></li>
                                    </ul>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default EditItem;
