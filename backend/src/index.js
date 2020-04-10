/*Importando o express*/
const express = require('express');
const routes = require('./routes');
const { errors } = require('celebrate');
const cors = require('cors');
/*instanciando nossa aplicação*/
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

/*A aplicação irá ouvir à porta 3333*/
app.listen(3333);