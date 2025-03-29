const { routes } = require('./routes');
const express = require('express');
const cors = require('cors');
const pool = require('../configBD');
const app = express();
app.use(express.json());
app.use(cors());


app.use(routes);


app.listen( 3002, () =>{
    console.log('Servidor da API rodando...')
});


