const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const validators = require('./validator');
const routes = express.Router();

routes.get('/ongs', OngController.read);
routes.get('/ongs/:id', OngController.readOng);
routes.post('/ongs', validators.createOng, OngController.create);
routes.put('/ongs/:id', validators.createOng, validators.putOng, OngController.put);
routes.delete('/ongs', OngController.delete);
routes.get('/profile', validators.profile, ProfileController.index);

routes.post('/session', SessionController.create);

routes.post('/incidents', validators.createIncidents, IncidentController.create);
routes.put('/incidents/:id', validators.createIncidents, validators.putIncident, IncidentController.put);
routes.get('/incidents', validators.listIncidents, IncidentController.read);
routes.delete('/incidents/:id', validators.deleteIncident, IncidentController.delete);

module.exports = routes;