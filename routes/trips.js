    var express = require("express");
    var router = express.Router();

    const Trip = require('../models/trips')
    const moment = require('moment');


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
    
  
  
// Route POST pour chercher des trajets selon départ, arrivée, et date
router.post("/search", (req, res) => {
    // 1. On récupère la date envoyée dans le body
    const date = req.body.date;
  
    // 2. On parse cette date avec moment, en UTC (important pour MongoDB)
    const parsedDate = moment.utc(date);
  
    // 3. On définit le début de la journée : 00:00:00
    const startDay = parsedDate.clone().startOf("day");
  
    // 4. On définit la fin de la journée : 23:59:59
    const endDay = parsedDate.clone().endOf("day");
  
    // 5. On fait une requête MongoDB avec :
    // - villes insensibles à la casse (via regex + "i")
    // - une plage de date complète sur 24h
    Trip.find({
      departure: { $regex: new RegExp(req.body.departure, "i") },
      arrival: { $regex: new RegExp(req.body.arrival, "i") },
      date: {
        $gte: startDay.toDate(), // >= 00:00:00
        $lte: endDay.toDate(),   // <= 23:59:59
      },
    })
      .then(data => {
        // 6. Si des trajets sont trouvés, on les retourne
        if (data.length > 0) {
          res.json({ result: true, trips: data });
        } else {
          // Sinon, on retourne un message d’erreur
          res.json({ result: false, error: "City not found" });
        }
      })
      .catch(err => {
        // En cas d’erreur serveur, on affiche le message
        res.status(500).json({ result: false, error: err.message });
      });
  });
  
  
  
  
  
  
  
  
    module.exports = router;