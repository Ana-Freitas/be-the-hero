const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();


routes.get('/ongs', OngController.read);
routes.post('/ongs', OngController.create);
routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.read);
routes.delete('/incidents/:id', IncidentController.delete);
module.exports = routes;