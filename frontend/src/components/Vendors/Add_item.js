import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const AddItem = (props) => {
    const [name, setname] = useState("");
    const [tags, settags] = useState([]);
    const [price, setprice] = useState(0);
    const [VegORnot, setVegORnot] = useState("");
    const [Addon, setAddon] = useState([]);
    const [Names, setNames] = useState(" ");

    const onChangename = (event) => {
        setname(event.target.value);
    };
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
    const onChangeName = (event) => {
        setNames(event.target.value);
    };

    const resetInputs = () => {
        setname("");
        settags([]);
        setprice(0);
        setVegORnot("");
        setAddon([]);
        setNames("");
    };

    const onSubmit = (event) => {
        event.preventDefault();
        var names = Names.split(',');
        console.log(names);
        let output = [];
        {
            let i, len
            for (i = 0, len = names.length; i < len; i += 2) {
                const newAddon = {
                    Item: names[i],
                    Price: names[i + 1]
                }
                output.push(newAddon)
            }
        }
        const newUser = {
            email: localStorage.getItem('email'),
            name: name,
            price: price,
            tags: tags,
            Addon: output,
            VegORnot: VegORnot,
        };
        console.log(newUser);
        if (price <= 0) { alert("Price needs to be positive") }
        else {
            axios
                .post("http://localhost:4000/vendor/additem", newUser)
                .then((res) => {
                    if (res.data.status === "Success") {
                        alert("Sucess ");
                    }
                    else {
                        alert(res.data.error)
                    }
                });
        }
        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="name"
                    variant="outlined"
                    value={name}
                    onChange={onChangename}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="price"
                    input type="Number"
                    variant="outlined"
                    value={price}
                    onChange={onChangeprice}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 225 }}>
                    <InputLabel id="demo-simple-select-label">Veg/Non Veg</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={VegORnot}
                        defaultValue={""}
                        label="Food Type"
                        onChange={onChangeVegORnot}
                    >
                        <MenuItem value={"Veg"}>Veg</MenuItem>
                        <MenuItem value={"Non Veg"}>Non Veg</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="tags (tag1,tag2,..)"
                    variant="outlined"
                    value={tags}
                    onChange={onChangetags}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Addon (item1,price1,item2,price2,..)"
                    variant="outlined"
                    value={Names}
                    onChange={onChangeName}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Add
                </Button>
            </Grid>
        </Grid>
    );
};

export default AddItem;