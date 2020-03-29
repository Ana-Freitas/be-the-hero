/* IMPORTANDO O KNEX E O ARQUIVO DE CONFIGURAÇÃO DO BANCO */
const knex = require('knex');
const configuration = require('../../knexfile');

/* Informando que nossa conexão será feita pelo knex e com a configuração 
que definimos no arquivo em ambiente de desenvolvimento*/
const connection = knex(configuration.development);

/*EXPORTANDO NOSSA CONEXÃO, PARA QUE FIQUE ACESSÍVEL PARA OS OUTROS IMPORTAREM */
module.exports = connection;