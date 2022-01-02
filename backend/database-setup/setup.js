const db = require('../config/db')

db.query("CREATE TABLE top_10(user_id int auto_increment primary key, top10_list json);")

db.query("CREATE TABLE rank_scores AS SELECT player_slug FROM player_bios;")
db.query("ALTER TABLE rank_scores ADD COLUMN top10_score float AFTER player_slug;")