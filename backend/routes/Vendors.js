var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Vendor = require("../models/Vendor");
const Item = require("../models/Food_Item");
const Order = require("../models/Order");

router.post("/additem", (req, res) => {
    Vendor.find({ email: req.body.email }, { _id: 1, shop_name: 1 }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            const newItem = new Item({
                name: req.body.name,
                Creator: vendors[0]["_id"],
                shop_name: vendors[0]["shop_name"],
                price: req.body.price,
                VegORnot: req.body.VegORnot,
                tags: req.body.tags,
                Addon: req.body.Addon
            });
            Item.findOne({ name: req.body.name, Creator: vendors[0]["_id"] }).then(item => {
                if (!item) {
                    newItem.save()
                        .then(user => {
                            res.json({ status: "Success" });
                        })
                        .catch(err => {
                            res.json({ status: "Failed" });
                        });
                }
                else {
                    return res.json({
                        error: "Item already exist", status: "Failed"
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
            Item.find(myquery, (err, items) => {
                if (err) {
                    console.log(err);
                    res.json({ status: "Failed" });
                }
                else {
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
                    res.json({ status: "Success", items: items });
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

router.post("/showorder", (req, res) => {
    Vendor.find({ email: req.body.email }, { _id: 1 }, (err, vendors) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failed" });
        }
        else {
            const id = vendors[0]["_id"];
            //console.log(vendors[0]["_id"]);
            var myquery = { seller: id };
            Order.find(myquery, (err, items) => {
                if (err) {
                    console.log(err);
                    res.json({ status: "Failed" });
                }
                else {
                    res.json({ status: "Success", items: items });
                }
            })
        }
    })
})

router.post("/changestatus", (req, res) => {
    if (req.body.status === "Accepted") {
        Vendor.find({ email: req.body.email }, { Current_order: 1 }, (err, vendors) => {
            if (err) {
                console.log(err);
                res.json({ done: "Failed" });
            }
            else {
                const Current_order = Number(vendors[0]["Current_order"]);
                //console.log(vendors[0]["_id"]);
                if (Current_order < 10) {
                    Vendor.updateOne({ email: req.body.email }, { $inc: { Current_order: 1 } }, (err, items) => {
                        if (err) {
                            console.log(err);
                            res.json({ done: "Failed", Msg: "Error occured" });
                        }
                        else {
                            var newvalues = { $set: { status: req.body.status } };
                            Order.updateOne({ _id: req.body.id }, newvalues, (err, items) => {
                                if (err) {
                                    console.log(err);
                                    res.json({ done: "Failed", Msg: "Error occured" });
                                }
                                else {
                                    res.json({ done: "Success", items: items });
                                }
                            })
                        }
                    })
                }
                else {
                    res.json({ done: "Failed", Msg: "Can't accept more orders" })
                }
            }
        })
    }
    else {
        if (req.body.status === "Ready For Pickup") {
            Vendor.updateOne({ email: req.body.email }, { $inc: { Current_order: -1 } }, (err, items) => {
                if (err) {
                    console.log(err);
                    res.json({ done: "Failed", Msg: "Some  Error Occured " });
                }
                else {
                    var newvalues = { $set: { status: req.body.status } };
                    Order.updateOne({ _id: req.body.id }, newvalues, (err, items) => {
                        if (err) {
                            console.log(err);
                            res.json({ done: "Failed", Msg: "Error Occured" });
                        }
                        else {
                            res.json({ done: "Success", items: items });
                        }
                    })
                }
            })
        }
        else {
            var newvalues = { $set: { status: req.body.status } };
            Order.updateOne({ _id: req.body.id }, newvalues, (err, items) => {
                if (err) {
                    console.log(err);
                    res.json({ done: "Failed", Msg: "Error Occured" });
                }
                else {
                    res.json({ done: "Success", items: items });
                }
            })
        }
    }
})

router.post("/rejectstatus", (req, res) => {
    Order.findById(req.body.id, (err, var1) => {
        if (err) {
            console.log(err);
            res.json({ done: "Failed", Msg: "Error Occured" });
        }
        else {
            const email = var1["buyer"]
            const item_name = var1["item_name"]
            const Creator = var1["seller"]

            User.updateOne({ email: email }, { $inc: { wallet: req.body.wallet } }, (err1, var2) => {
                if (err1) {
                    console.log(err1)
                    res.json({ done: "Failed", Msg: "Error Occured" });
                }
                else {
                    var newvalues = { $set: { status: "Rejected" } };
                    Order.updateOne({ _id: req.body.id }, newvalues, (err, items) => {
                        if (err) {
                            console.log(err);
                            res.json({ done: "Failed", Msg: "Error Occured" });
                        }
                        else {
                            Item.updateOne({ name: var1.item_name, Creator: var1.seller }, { $inc: { rejected_orders: 1 } }, (err1, var2) => {
                                if (err1) {
                                    console.log(err1)
                                    res.json({ done: "Failed", Msg: "Error Occured" })
                                }
                                else {
                                    res.json({ done: "Success" })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})


router.post("/topfive", (req, res) => {
    Vendor.findOne({ email: req.body.email }, { _id: 1 }).then(vendor => {
        if (!vendor) {
            console.log("Wrong email")
            res.json({ status: "Failed" })
        }
        else {
            const id = vendor["_id"]
            Item.find({ Creator: id }).sort({ orders: -1, rating: -1 }).limit(5).then(items => {
                if (!items) {
                    console.log("Wrong email")
                    res.json({ status: "Failed" })
                }
                else {
                    res.json({ status: "Success", items: items })
                }
            }).catch(err => {
                console.log(err)
            })
        }

    }).catch(err => {
        console.log(err)
    })
})

router.post("/order_count", (req, res) => {
    Vendor.findOne({ email: req.body.email }, { _id: 1 }).then(vendor => {
        if (!vendor) {
            console.log("Wrong email")
            res.json({ status: "Failed" })
        }
        else {
            const id = vendor["_id"]
            Item.aggregate([
                { $match: { Creator: id } },
                {
                    $group: {
                        _id: { Creator: "$Creator" },
                        orderTotal: { $sum: "$orders" },
                        rejectTotal: { $sum: "$rejected_orders" },
                        completeTotal: { $sum: "$completed_orders" }
                    }
                }
            ]).then(items => {
                if (!items) {
                    console.log("Wrong email")
                    res.json({ status: "Failed" })
                }
                else {
                    res.json({ status: "Success", items: items })
                }
            }).catch(err => {
                console.log(err)
            })
        }

    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;