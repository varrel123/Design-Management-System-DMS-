const {Client} = require('pg');

const db = new Client({
    user: 'edynoer',
    host: 'ep-misty-glade-a1ma21wk.ap-southeast-1.aws.neon.tech',
    database: 'DOA_GMF',
    password: '5oW4RqOsJkLP',
    port: 5432,
    sslmode: 'require',
    ssl: true
});

// psql 'postgresql://edynoer:5oW4RqOsJkLP@ep-misty-glade-a1ma21wk.ap-southeast-1.aws.neon.tech/DOA_GMF?sslmode=require'

db.connect((err) => {
    if (err) {
        console.log(err);
        }
        else {
            console.log('Connected to the database');
        }
});

module.exports = db;