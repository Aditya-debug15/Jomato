import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Vendoredit = (props) => {
    const [details, setDetails] = useState([]);
    const [ContactNumber, setContactNumber] = useState("");
    const [OpenTime, setOpenTime] = useState("");
    const [CloseTime, setCloseTime] = useState("");
    // const [tags, settags] = useState([]);
    const [Password, setPassword] = useState("");

    const onChangePassword = (event) =>{
        setPassword(event.target.value);
    };
    // const onChangetags = (event) =>{
    //     var names = event.target.value;
    //     settags(names.split(','));
    // };
    const onChangeCloseTime = (event) =>{
        setCloseTime(event.target.value);
    };
    const onChangeOpenTime = (event) =>{
        setOpenTime(event.target.value);
    };
    const onChangeContactNumber = (event) =>{
        setContactNumber(event.target.value);
    };

    useEffect(() => {
        const newuser = {
            email : localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/vendor/editgetprofile",newuser)
            .then((response) => {
                setDetails(response.data);
                setCloseTime(response.data[0].CloseTime);
                setOpenTime(response.data[0].OpenTime);
                setContactNumber(response.data[0].ContactNumber);
                // settags(response.data[0].tags);
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
            OpenTime: OpenTime,
            CloseTime: CloseTime,
            // tags: tags,
            ContactNumber: ContactNumber
        };
        
        axios
            .post("http://localhost:4000/vendor/editprofile", newUser)
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
                        {/* <Grid item xs={12}>
                            <TextField
                                label="Enter tags comma separated"
                                variant="outlined"
                                value={tags}
                                onChange={onChangetags}
                            />
                        </Grid> */}
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
                                label="new opening time"
                                variant="outlined"
                                value={OpenTime}
                                onChange={onChangeOpenTime}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="new closing time"
                                variant="outlined"
                                value={CloseTime}
                                onChange={onChangeCloseTime}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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

export default Vendoredit;
