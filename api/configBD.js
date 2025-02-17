const {Pool} = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let poll = null;

if (isProduction){
    pool = new Pool({
        connectionString : process.env.DATABASE_URL, ssl: {
            rejectUnauthorized: false
        }
    })
}else{
    poll = new Pool({
        user : 'postgres',
        host : 'localhost',
        database : 'challenge-full-stack-web',
        password : '@1B2c3d4e5',
        port : '5432'
    })
}

module.exports = poll;