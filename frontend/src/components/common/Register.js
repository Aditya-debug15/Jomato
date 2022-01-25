import React, { Component } from 'react';
import axios from 'axios';

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
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onChangeshowOne = this.onChangeUsertype.bind(this);
        this.onChangeshowTwo = this.onChangeUsertype.bind(this);
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

    onChangeUsertype(event) {
        console.log(event.target.value)
        this.setState({ usertype: event.target.value });
        if (event.target.id === "buyer") {
            this.setState({ showOne: true, showTwo: false });
        }
        if (event.target.id === "vendor") {
            this.setState({ showOne: false, showTwo: true });
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
            shopname:this.state.shopname,
            closetime:this.state.closetime,
            opentime:this.state.opentime
        }

        axios.post('http://localhost:4000/user/register', newUser)
            .then(res => {
                console.log(res.data)
                alert("Success")
            })
            .catch(err => {
                console.log(err)
                alert("email not unique or a required field left empty")
            })

        this.setState({
            email: '',
            Password: '',
            usertype: '',
            name: '',
        });
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Usertype: </label><br></br>
                    <button for="buyer">
                        <input type="radio" id="buyer" name="usertype" value="buyer" onChange={this.onChangeUsertype} />
                        buyer</button><br></br>
                    <button for="vendor">
                        <input type="radio" id="vendor" name="usertype" value="vendor" onChange={this.onChangeUsertype} />
                        vendor</button><br></br>
                </div>
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
                                <div className="form-group">
                                    <label>Batch: </label>
                                    <input type="number"
                                        className="form-control"
                                        value={this.state.batch}
                                        onChange={this.onChangebatch}
                                    />
                                </div>
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
            </div>
        )
    }
}