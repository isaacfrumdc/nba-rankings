const express = require('express');
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
    db.query("SELECT * FROM player_bios", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});


