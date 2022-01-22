import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Vendoredit = (props) => {
    const [tags, settags] = useState([]);
    const [price, setprice] = useState(0);
    const [VegORnot, setVegORnot] = useState("");
    const [Names, setNames] = useState(" ");

    const onChangetags = (event) => {
        var names = event.target.value;
        settags(names.split(','));
    };
    const onChangeprice = (event) => {
        setprice(event.target.value);
    };
    const onChangeVegORnot = (event) => {
        setVegORnot(event.target.value);
    };
    const onChangeNames = (event) => {
        setNames(event.target.value);
    };

    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email'),
            name: localStorage.getItem('item_name')
        }
        axios
            .post("http://localhost:4000/vendor/editgetitem", newuser)
            .then((response) => {
                var input = response.data[0].Addon
                let i,len,text
                for (i = 0, len = input.length, text = ""; i < len; i++) {
                    text += input[i].Item + "," + input[i].Price
                    if(i!=(len-1))
                    {
                        text +=","
                    }
                }
                setNames(text)
                setprice(response.data[0].price);
                setVegORnot(response.data[0].VegORnot);
                settags(response.data[0].tags);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const onSubmit = (event) => {
        event.preventDefault();
        var names = Names.split(',');
        console.log(names);
        let output = [];
        {
            let i,len
            for (i = 0, len = names.length; i < len; i+=2) {
                const newAddon ={
                    Item: names[i],
                    Price:names[i+1]
                }
                output.push(newAddon)
            }
        }
        const newUser = {
            email: localStorage.getItem('email'),
            name: localStorage.getItem('item_name'),
            price: price,
            VegORnot: VegORnot,
            tags: tags,
            Addon:output
        };

        axios
            .post("http://localhost:4000/vendor/edititem", newUser)
            .then((res) => {
                if (res.data.status === "Success") {
                    alert("Edited ") 
                        console.log(tags);
                        console.log(res.data.newvalues);
                        localStorage.removeItem('item_name');
                        window.location.href = "/"
                }
                else {
                    alert("invalid input")
                }
            });

    };
    const onSubmit2 = (event) =>{
        event.preventDefault();
        localStorage.removeItem('item_name');
        window.location.href = "/"
    }
    if (localStorage.getItem('item_name') !== null) {
        return (
            <>
                <div className="Vendor-container">
                    <Grid container align={"center"} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Enter tags comma separated"
                                variant="outlined"
                                value={tags}
                                onChange={onChangetags}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Addon (item1,price1,item2,price2...)"
                                variant="outlined"
                                value={Names}
                                onChange={onChangeNames}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="new price"
                                variant="outlined"
                                value={price}
                                onChange={onChangeprice}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Veg / Non Veg"
                                variant="outlined"
                                value={VegORnot}
                                onChange={onChangeVegORnot}
                            />
                        </Grid>
                        <Grid item xs={12}>
                                <Button variant="contained" onClick={onSubmit}>
                                    Edit
                                </Button>
                            </Grid>
                        <Grid item xs={12}>
                                <Button variant="contained" onClick={onSubmit2}>
                                    Don't Edit
                                </Button>
                            </Grid>
                    </Grid>
                </div>
            </>
        );
    }
    else {
        return (
            <>
            <h1>Select Item first</h1>
            <br></br>
            <h1> To select item <a href="/listitems">click here</a></h1>
            </>
        )
    }
};

export default Vendoredit;
