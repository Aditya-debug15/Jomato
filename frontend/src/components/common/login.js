import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = (props) => {
    const [email, setemail] = useState("");
    const [Password, setPassword] = useState("");

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeemail = (event) => {
        setemail(event.target.value);
    };

    const resetInputs = () => {
        setPassword("");
        setemail("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            Password: Password,
        };

        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((res) => {
                if (res.data.status === "Success") {
                    alert("Welcome " + res.data.Type +" "+res.data.Name)
                    if(res.data.Type === 'Vendor')
                    {
                        localStorage.setItem('loggedin','1');
                        localStorage.setItem('usertype','Vendor');
                        localStorage.setItem('email',email);
                        window.location.reload()
                        window.location.href = "/";
                    }
                    else{
                        localStorage.setItem('loggedin','1');
                        localStorage.setItem('usertype','Buyer');
                        localStorage.setItem('email',email);
                        window.location.reload()
                        window.location.href = "/";
                    }
                }
                else {
                    alert("invalid credentials")
                }
            });

        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeemail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    input type = "Password"
                    variant="outlined"
                    value={Password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default Login;