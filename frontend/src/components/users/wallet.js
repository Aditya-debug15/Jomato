import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Useredit = (props) => {
    const [details, setDetails] = useState([]);
    const [wallet,setwallet] = useState(0);
    const [add, setadd] = useState(0);
    const onChangeadd = (event) => {
        setadd(event.target.value);
    };
    const onChangewallet = (event) => {
        setwallet(event.target.value);
    };

    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/user/editgetprofile", newuser)
            .then((response) => {
                setDetails(response.data);
                setwallet(response.data[0].wallet)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: localStorage.getItem('email'),
            wallet: Number( wallet) + Number( add)
        };
        if (add > 0) {
            axios
                .post("http://localhost:4000/user/wallet", newUser)
                .then((res) => {
                    if (res.data.status === "Success") {
                        alert("Updated :)")
                        // console.log(tags);
                        console.log(res.data.newvalues);
                        window.location.reload()
                    }
                    else {
                        alert("invalid command")
                    }
                });
        }
        else{
            alert("invalid action")
        }
    };
    return (
        <>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '35vh'}}>
            <AccountBalanceWalletIcon sx={{ fontSize: 160 }} />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
            <h1>Balance:{"\n"}</h1>
            <h1>{wallet}{"\n"}</h1>
            </div>
            <div className="Vendor-container">
                {details.map((data, key) => {
                    return (
                        <Grid container align={"center"} spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="wallet"
                                    input type="Number"
                                    variant="outlined"
                                    value={add}
                                    onChange={onChangeadd}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={onSubmit}>
                                    Add
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
