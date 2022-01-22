import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Useredit = (props) => {
    const [details, setDetails] = useState([]);
    const [ContactNumber, setContactNumber] = useState("");
    const [batch, setbatch] = useState("");
    const [age, setage] = useState("");
    const [Password, setPassword] = useState("");

    const onChangePassword = (event) =>{
        setPassword(event.target.value);
    };
    const onChangebatch = (event) =>{
        setbatch(event.target.value);
    };
    const onChangeage= (event) =>{
        setage(event.target.value);
    };
    const onChangeContactNumber = (event) =>{
        setContactNumber(event.target.value);
    };

    useEffect(() => {
        const newuser = {
            email : localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/user/editgetprofile",newuser)
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
                                input type = "password"
                                variant="outlined"
                                value={Password}
                                onChange={onChangePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                input type = "Number"
                                label="new Age"
                                variant="outlined"
                                value={age}
                                onChange={onChangeage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                input type = "Number"
                                label="new batch"
                                variant="outlined"
                                value={batch}
                                onChange={onChangebatch}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                input type = "Number"
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
