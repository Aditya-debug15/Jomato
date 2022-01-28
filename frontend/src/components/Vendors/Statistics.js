import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
const Statistics = (props) => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
    }));

    const [details, setDetails] = useState([]);
    const [details2, setDetails2] = useState([]);
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    useEffect(() => {
        const newuser = {
            email: localStorage.getItem('email')
        }
        axios
            .post("http://localhost:4000/vendor/topfive", newuser)
            .then((response) => {
                if (response.data.status == "Success") {
                    setDetails(response.data.items);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        axios
            .post("http://localhost:4000/vendor/order_count", newuser)
            .then((response) => {
                if (response.data.status == "Success") {
                    setDetails2(response.data.items);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(details2)
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                {
                    details.map((user, ind) => (
                        ind % 2 == 0 ? (<Grid item xs={4}>
                            <ThemeProvider theme={lightTheme}>
                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: 'background.default',
                                        display: 'grid',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 1.5,
                                        width: 100
                                    }}
                                >
                                    <Item sx={{ width: 250, height: 200 }} elevation={24}>
                                        <List sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={user.name}
                                                    secondary={
                                                        <Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {user.price}
                                                            </Typography>
                                                            {" — Price"}<br></br>{user.completed_orders}{" - orders"}<br></br>{user.rating}{" - rating"}<br></br>{user.rejected_orders}{" - rejected orders"}
                                                        </Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Item>
                                </Box>
                            </ThemeProvider>
                        </Grid>) : (<Grid item xs={4} >
                            <ThemeProvider theme={darkTheme}>
                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: 'background.default',
                                        display: 'grid',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 1.5,
                                        width: 250
                                    }}
                                >
                                    <Item sx={{ width: 250, height: 200 }} elevation={12}>
                                        <List sx={{ width: '100%', maxWidth: 255 }}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={user.name}
                                                    secondary={
                                                        <Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                            >
                                                                {user.price}
                                                            </Typography>
                                                            {" — Price"}<br></br>{user.completed_orders}{" - orders"}<br></br>{user.rating}{" - rating"}<br></br>{user.rejected_orders}{" - rejected orders"}
                                                        </Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Item>
                                </Box>
                            </ThemeProvider>
                        </Grid>)
                    ))
                }
            </Grid>
            <br></br><br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh' }}>
                <h1>{"Order Counts"}</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh' }}>

                <Grid container spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }} >
                        <Grid item xs={4} >
                            <ThemeProvider theme={darkTheme}>
                                <Box
                                    sx={{
                                        p: 1,
                                        bgcolor: 'background.default',
                                        display: 'grid',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 1.5,
                                        width: 200
                                    }}
                                >
                                    <Item sx={{ width: 200, height: 170 }} elevation={24}>
                                        <List sx={{ width: '100%', maxWidth: 200 }}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary="Stats"
                                                    secondary={
                                                        <Fragment>
                                                            {
                                                                details2.map((counts, ind) => (
                                                                    <ul>
                                                                        <li>{counts.orderTotal}{"  - Orders placed"}</li>
                                                                        <li>{counts.rejectTotal}{"  - Orders rejected"}</li>
                                                                        <li>{counts.completeTotal}{"  - Orders completed"}</li>
                                                                        <li>{counts.orderTotal - counts.completeTotal - counts.rejectTotal}{"  - Orders pending"}</li>
                                                                    </ul>
                                                                ))
                                                            }
                                                        </Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Item>
                                </Box>
                            </ThemeProvider>
                        </Grid>
                </Grid>
        </div>
        </div >
    )
}
export default Statistics;