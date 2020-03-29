/*Importando o express*/
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
/*instanciando nossa aplicação*/
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/*A aplicação irá ouvir à porta 3333*/
app.listen(3333);