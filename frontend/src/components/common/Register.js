import React, { Component } from 'react';
import { useState } from "react";
import axios from 'axios';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class CreateUser extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            Password: '',
            usertype: '',
            batch: 1,
            age: 18,
            ContactNumber: 0,
            shopname: '',
            opentime: '',
            closetime: '',
            showOne: false,
            showTwo: false,
            vegcheck: 1,
        }

        this.onChangename = this.onChangename.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeage = this.onChangeage.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangebatch = this.onChangebatch.bind(this);
        this.onChangeshopname = this.onChangeshopname.bind(this);
        this.onChangeopentime = this.onChangeopentime.bind(this);
        this.onChangeclosetime = this.onChangeclosetime.bind(this);
        this.handleChangeveg = this.handleChangeveg.bind(this);
        this.onChangeUsertype = this.handleChangeveg.bind(this);
        this.onChangeshowOne = this.handleChangeveg.bind(this);
        this.onChangeshowTwo = this.handleChangeveg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangebatch(event) {
        this.setState({ batch: event.target.value });
    }

    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ Password: event.target.value });
    }
    onChangeage(event) {
        this.setState({ age: event.target.value });
    }
    onChangeContactNumber(event) {
        this.setState({ ContactNumber: event.target.value });
    }
    onChangeclosetime(event) {
        this.setState({ closetime: event.target.value });
    }
    onChangeopentime(event) {
        this.setState({ opentime: event.target.value });
    }
    onChangeshopname(event) {
        this.setState({ shopname: event.target.value });
    }

    handleChangeveg(event) {
        if (event.target.value === 1) {
            console.log("111")
            this.setState({ vegcheck: event.target.value, showOne: true, showTwo: false, usertype: "buyer" })
        }
        else if (event.target.value === 2) {
            this.setState({ vegcheck: event.target.value, showOne: false, showTwo: true, usertype: "vendor" })
        }
        else {
            this.setState({ vegcheck: event.target.value, showOne: false, showTwo: false })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            Password: this.state.Password,
            usertype: this.state.usertype,
            batch: this.state.batch,
            age: this.state.age,
            ContactNumber: this.state.ContactNumber,
            shopname: this.state.shopname,
            closetime: this.state.closetime,
            opentime: this.state.opentime
        }
        if (this.state.usertype === "buyer" && this.state.age <= 0) {
            alert("Incorrect details")
        }
        else {
            axios.post('http://localhost:4000/user/register', newUser)
                .then(res => {
                    console.log(res.data)
                    alert("Success")
                })
                .catch(err => {
                    console.log(err)
                    alert("email not unique or a required field left empty")
                })
        }
        this.setState({
            email: '',
            Password: '',
            usertype: '',
            name: '',
        });
    }

    render() {
        return (
            <Grid container align={"center"} spacing={1}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Vendor/Buyer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.vegcheck}
                        defaultValue={0}
                        label="Vendor/Buyer"
                        onChange={this.handleChangeveg}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Buyer</MenuItem>
                        <MenuItem value={2}>Vendor</MenuItem>
                    </Select>
                </FormControl>
                {/* <div className="form-group">
                    <label>Usertype: </label><br></br>
                    <Button for="buyer">
                        <input type="radio" id="buyer" name="usertype" value="buyer" onChange={this.onChangeUsertype} />
                        buyer</Button><br></br>
                    <Button for="vendor">
                        <input type="radio" id="vendor" name="usertype" value="vendor" onChange={this.onChangeUsertype} />
                        vendor</Button><br></br>
                </div> */}
                <div>
                    {this.state.showOne ?
                        <>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label> email: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={this.onChangeemail}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input type="Password"
                                        className="form-control"
                                        value={this.state.Password}
                                        onChange={this.onChangePassword}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Name: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.onChangename}
                                    />
                                </div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.batch}
                                        defaultValue={1}
                                        label="Batch"
                                        onChange={this.onChangebatch}
                                    >
                                        <MenuItem value={1}>UG1</MenuItem>
                                        <MenuItem value={2}>UG2</MenuItem>
                                        <MenuItem value={3}>UG3</MenuItem>
                                        <MenuItem value={4}>UG4</MenuItem>
                                        <MenuItem value={5}>UG5</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className="form-group">
                                    <label>Age: </label>
                                    <input type="number"
                                        className="form-control"
                                        value={this.state.age}
                                        onChange={this.onChangeage}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Number: </label>
                                    <input type="number"
                                        className="form-control"
                                        value={this.state.ContactNumber}
                                        onChange={this.onChangeContactNumber}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Create User" className="btn btn-primary" />
                                </div>
                            </form>
                        </>
                        :
                        <div></div>
                    }
                    {this.state.showTwo ?
                        <>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label> email: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={this.onChangeemail}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input type="Password"
                                        className="form-control"
                                        value={this.state.Password}
                                        onChange={this.onChangePassword}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Name: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.onChangename}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Number: </label>
                                    <input type="number"
                                        className="form-control"
                                        value={this.state.ContactNumber}
                                        onChange={this.onChangeContactNumber}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Shop Name: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.shopname}
                                        onChange={this.onChangeshopname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Opening time</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.opentime}
                                        onChange={this.onChangeopentime}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Closing time: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.closetime}
                                        onChange={this.onChangeclosetime}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Create User" className="btn btn-primary" />
                                </div>
                            </form>
                        </>
                        :
                        <div></div>
                    }
                </div>
            </Grid>
        )
    }
}