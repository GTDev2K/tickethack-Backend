    var express = require("express");
    var router = express.Router();

    const Trip = require('../models/trips')


    router.get("/", (req, res) => {

        Trip.find()
        .then(tripdata => {
            console.log(tripdata);
            res.json({ result: true, trips: tripdata });
        })
        .catch(err => {
            console.error(err);
        });
    
    })
    
  
  
    router.get("/search", (req, res) => {

        
            Trip.find({
              departure: { $regex: new RegExp(req.body.departure, "i") },
              arrival: { $regex: new RegExp(req.body.arrival, "i") },
            }).then(data => {
              if (data.length > 0) {
                res.json({ result: true, trips: data });
              } else {
                res.json({ result: false, error: "City not found" });
              }
            });
          });
  
  
  
  
  
  
  
  
  
    module.exports = router;