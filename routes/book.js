var express = require("express");
var router = express.Router();

const Trip = require('../models/trips')
const Cart = require ('../models/cart')
const moment = require('moment');

router.post('/', (req, res)=>{
    // On va utiliser req.body pour récup de l'information
    // On va récupérer l'_id d'un trip depuis le front

    const tripId = req.body.id // On va récupérer l'_id tu trip par la propriété id de req.body

    // On va aller chercher dans la BDD un trip correspondant à l'_id

    Trip
        .findById(tripId)
        .then((foundTrip) => {
            if (!foundTrip) {
                res.json({ error: "Trip not found" })
            } else {
                const newCart = new Cart({ 
                    tripId : foundTrip._id, // Clé étrangère
                })
                newCart
                    .save()
                    .then(() => res.json({result: "saved", trip: data}))
            }
        })

    // Un fois le trip récupéré, on va transvaser ce trip dans la collection cart





    // Trip.findById(_id).then((data)=>{
    //     data.save()
    //     res.json({result: "saved", trip: data})
    // })
})