var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Vendor = require("../models/Vendor");
const Items = require("../models/Food_Item");
const Order = require("../models/Order");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
router.get("/vendor", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    console.log("Here0")
    const email = req.body.email;
    if (req.body.usertype == "buyer") {
        console.log("Here")
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            ContactNumber: req.body.ContactNumber,
            batch: req.body.batch,
            Password: req.body.Password
        });
        // Find user by email
        User.findOne({ email }).then(user => {
            if (!user) {
                newUser.save()
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
            else {
                return res.status(404).json({
                    error: "User already exist",
                });
            }
        })
    }
    else {
        console.log("here 2")
        const newVendor = new Vendor({
            name: req.body.name,
            email: req.body.email,
            shop_name: req.body.shopname,
            ContactNumber: req.body.ContactNumber,
            OpenTime: req.body.opentime,
            CloseTime: req.body.closetime,
            Password: req.body.Password
        });
        // Find user by email
        Vendor.findOne({ email }).then(vendor => {
            if (!vendor) {
                console.log("here 3")
                newVendor.save()
                    .then(vendor => {
                        res.status(200).json(vendor);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
            else {
                return res.status(404).json({
                    error: "User already exist",
                });
            }
        })
    }
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            Vendor.findOne({ email }).then(vendor => {
                if (!vendor) {
                    res.json({ status: "Failed", Msg: "Email doesn't exist" })
                }
                else {
                    if (vendor.Password == req.body.Password) {
                        res.json({ status: "Success", Type: "Vendor", Name: vendor.name });
                        return vendor;
                    }
                    else {
                        res.json({ status: "Failed", Msg: "Password Incorrect" })
                    }
                }
            });
        }
        else {
            if (user.Password == req.body.Password) {
                res.json({ status: "Success", Type: "User", Name: user.name });
                return user;
            }
            else {
                console.log("done2")
                res.json({ status: "Failed", Msg: "Password Incorrect" });
            }
        }
    });
});

// POST request
// Dashboard
router.post("/editprofile", (req, res) => {
    var myquery = { email: req.body.email };
    var newvalues = { $set: { ContactNumber: req.body.ContactNumber, batch: req.body.batch, age: req.body.age, Password: req.body.Password } };
    User.updateOne(myquery, newvalues, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            res.json({ status: "Success", newvalues: newvalues });
        }
    })
})

router.post("/editgetprofile", (req, res) => {
    User.find({ email: req.body.email }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            res.json(vendors);
        }
    })
})

router.post("/wallet", (req, res) => {
    var myquery = { email: req.body.email };
    var newvalues = { $set: { wallet: req.body.wallet } };
    User.updateOne(myquery, newvalues, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            res.json({ status: "Success", newvalues: newvalues });
        }
    })
})

router.get("/listitems",function (req, res) {
    Items.aggregate(
        [{
            $lookup:{
                from: "vendors",
                localField : "Creator",
                foreignField : "_id",
                as : "Seller"
            }
        }],(err,items) =>{
            if(err){
                console.log(err);
                res.json({status:"Failed"});
            }
            else{
                res.json(items);
            }
        }
    )
})

router.post("/addfavourite",function(req,res){
    User.updateOne({email:req.body.email},{$addToSet:{Favourite:req.body.Favourite}},(err,user)=>{
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            res.json({ status: "Success", newvalues: user });
        }
    })
})

router.post("/order",function(req,res){
    User.find({email:req.body.buyer},{wallet:1},(err,users) =>{
        if(err){
            console.log(err);
            res.json({status:"Failed",message:"Database Failure"})
        }
        else{
            let wallet = users[0]["wallet"]
            if(Number(wallet)>=req.body.price)
            {
                wallet = Number(wallet) - req.body.price
                const newOrder = new Order({
                    buyer: req.body.buyer,
                    item_name: req.body.item_name,
                    price: req.body.price,
                    seller: req.body.seller,
                    Addon: req.body.Addon,
                    quantity: req.body.quantity
                });
                newOrder.save()
                    .then(variable =>{
                        var myquery = { email: req.body.buyer };
                        var newvalues = { $set: { wallet: wallet} };
                        User.updateOne(myquery, newvalues, (err, variable2) => {
                            if (err) {
                                console.log(err);
                                res.json({ status: "Failed" });
                            }
                            else {
                                var myquery2 = { $and: [{ Creator: req.body.seller }, { name: req.body.item_name }] };
                                var newvalues2 = { $inc: { orders: 1} };
                                Items.updateOne(myquery2, newvalues2, (err, variable2) => {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failed" });
                                    }
                                    else {
                                        res.json({ status: "Success",newvalues:newvalues ,newvalues2: newvalues2 });
                                    }
                                })
                            }
                        })
                    })
                    .catch(err =>{
                        res.json({status:"Failed",error:err})
                    })
            }
            else{
                res.json({status:"Failed",message:"Insufficient ballance"});
            }
        }
    })
})

module.exports = router;

