const express = require('express')
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 7000;
app.use(cors({origin: true, credentials: true}));
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

// Route to get all players
app.get("/api/get", (req, res) => {
    console.log("HERE");
    db.query("SELECT * FROM player_bios", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to search by name
app.get("/api/get/getFromName", (req, res) => {

    const name = '%' + req.query.name + '%';
    console.log(name);
    db.query("SELECT * FROM player_Bios WHERE player_last_name LIKE ? OR player_first_name LIKE ?", 
        [name, name],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
});

// Route for adding idea to ranking
app.post("/api/rank/top10", (req, res) => {

    const userID = req.body.userID;
    const top10 = req.body.top10;
    db.query("INSERT INTO top_10 (userID, top10) VALUES (?,?)", 
        [userID, top10],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });
});