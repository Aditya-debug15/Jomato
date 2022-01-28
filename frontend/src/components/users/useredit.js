import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Useredit = (props) => {
    const [details, setDetails] = useState([]);
    const [ContactNumber, setContactNumber] = useState("");
    const [batch, setbatch] = useState("");
    const [age, setage] = useState("");
    const [Password, setPassword] = useState("");

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onChangebatch = (event) => {
        setbatch(event.target.value);
    };
    const onChangeage = (event) => {
        setage(event.target.value);
    };
    const onChangeContactNumber = (event) => {
        setContactNumber(event.target.value);
    };

    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/user/editgetprofile", newuser)
            .then((response) => {
                setDetails(response.data);
                setage(response.data[0].age);
                setbatch(response.data[0].batch);
                setContactNumber(response.data[0].ContactNumber);
                setPassword(response.data[0].Password);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: localStorage.getItem('email'),
            Password: Password,
            age: age,
            batch: batch,
            ContactNumber: ContactNumber
        };
        if (age <= 0) {
            alert("age can't be negative")
        }
        else {
            axios
                .post("http://localhost:4000/user/editprofile", newUser)
            .then((res) => {
                if (res.data.status === "Success") {
                    alert("Edited ")
                    // console.log(tags);
                    console.log(res.data.newvalues);
                    window.location.href = "/profile"
                }
                else {
                    alert("invalid credentials")
                }
            });
        }
    };
    return (
        <>
            <div className="Vendor-container">
                {details.map((data, key) => {
                    return (
                        <Grid container align={"center"} spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="new Password"
                                    input type="password"
                                    variant="outlined"
                                    value={Password}
                                    onChange={onChangePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    input type="Number"
                                    label="new Age"
                                    variant="outlined"
                                    value={age}
                                    onChange={onChangeage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, width: 225 }}>
                                    <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={batch}
                                        defaultValue={1}
                                        label="Batch"
                                        onChange={onChangebatch}
                                    >
                                        <MenuItem value={1}>UG1</MenuItem>
                                        <MenuItem value={2}>UG2</MenuItem>
                                        <MenuItem value={3}>UG3</MenuItem>
                                        <MenuItem value={4}>UG4</MenuItem>
                                        <MenuItem value={5}>UG5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    input type="Number"
                                    label="new contact number"
                                    variant="outlined"
                                    value={ContactNumber}
                                    onChange={onChangeContactNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={onSubmit}>
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                    );
                })}
            </div>
        </>
    );
};

export default Useredit;
