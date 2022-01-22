var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Vendor = require("../models/Vendor");
const Item = require("../models/Food_Item");

router.post("/additem", (req, res) => {
    Vendor.find({ email: req.body.email }, { _id: 1 }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            const newItem = new Item({
                name: req.body.name,
                Creator :vendors[0]["_id"],
                price: req.body.price,
                VegORnot: req.body.VegORnot,
                tags: req.body.tags,
                Addon: req.body.Addon
            });
            Item.findOne({ name: req.body.name }).then(item => {
                if (!item) {
                    newItem.save()
                        .then(user => {
                            res.json({status:"Success"});
                        })
                        .catch(err => {
                            res.json({status:"Failed"});
                        });
                }
                else {
                    return res.json({ error: "Item already exist", status:"Failed"
                    });
                }
            })
        }
    })
})

router.post("/listitem", (req, res) => {
    Vendor.find({ email: req.body.email }, { _id: 1 }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            const id = vendors[0]["_id"];
            var myquery = { Creator: id };
            Item.find(myquery, function (err, users) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(users);
                }
            })
        }
    })
})
router.post("/editprofile", (req, res) => {
    var myquery = { email: req.body.email };
    var newvalues = { $set: { ContactNumber: req.body.ContactNumber, OpenTime: req.body.OpenTime, CloseTime: req.body.CloseTime, Password: req.body.Password } };
    Vendor.updateOne(myquery, newvalues, (err, vendors) => {
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
    Vendor.find({ email: req.body.email }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            res.json(vendors);
        }
    })
})

router.post("/editgetitem", (req, res) => {
    Vendor.find({ email: req.body.email }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            const id = vendors[0]["_id"];
            var myquery = { $and: [{ Creator: id }, { name: req.body.name }] };
            Item.find(myquery,(err,items) =>{
                if(err){
                    console.log(err);
                    res.json({ status: "Failed" });
                }
                else{
                    res.json(items);
                }
            })
        }
    })
})

router.post("/edititem", (req, res) => {
    Vendor.find({ email: req.body.email }, { _id: 1 }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            const id = vendors[0]["_id"];
            //console.log(vendors[0]["_id"]);
            var myquery = { $and: [{ Creator: id }, { name: req.body.name }] };
            var newvalues = { $set: { price: req.body.price, Addon: req.body.Addon, VegORnot: req.body.VegORnot, tags: req.body.tags } };
            Item.updateOne(myquery, newvalues, (err, items) => {
                if (err) {
                    console.log(err);
                    res.json({ status: "Failed" });
                }
                else {
                    res.json({status: "Success", items: items});
                }
            })
        }
    })
})

router.post("/removeitem", (req, res) => {
    Vendor.find({ email: req.body.email }, { _id: 1 }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            const id = vendors[0]["_id"];
            //console.log(vendors[0]["_id"]);
            var myquery = { $and: [{ Creator: id }, { name: req.body.name }] };
            Item.remove(myquery, (err, items) => {
                if (err) {
                    console.log(err);
                    res.json({ status: "Failed" });
                }
                else {
                    res.json({ status: "Success" });
                }
            })
        }
    })
})

module.exports = router;