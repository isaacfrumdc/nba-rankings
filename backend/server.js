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
    const top10 = req.body.top10_list;
    console.log("add");
    db.query("INSERT INTO top_10 (user_id, top10_list) VALUES (?,?)", 
        [userID, top10],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });
});

app.get("/api/get/allTop10" , (req, res) => {
    console.log("HERE2");
    db.query("SELECT * FROM top_10", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.post("/api/rankScore", (req, res) => {
    console.log("HERE3");

    const player_slug = req.body.slug;
    console.log(player_slug);
    const score = req.body.score;
    console.log(score);
    db.query("UPDATE rank_scores SET top10_score = ? WHERE player_slug = ?",
    [score, player_slug],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.get("/api/get/consensus/top10", (req, res) => {
    db.query("SELECT * FROM player_bios INNER JOIN rank_scores ON player_bios.player_slug = rank_scores.player_slug WHERE top10_score IS NOT NULL ORDER BY top10_score LIMIT 10;",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
            res.send(result)
        });
});