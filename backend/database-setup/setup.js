const db = require('../config/db')

db.query("CREATE TABLE top_10(user_id int auto_increment primary key, top10_list json);")