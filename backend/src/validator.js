
const { celebrate, Segments, Joi } = require('celebrate')

/***************VALIDAÇÃO CADASTRO DE ONG******************* */
const createOng = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().trim().required(),
        email: Joi.string().trim().required().email(),
        whatsapp: Joi.string().trim().regex(/^[0-9]{10,13}$/).required(),
        city: Joi.string().trim().required(),
        uf: Joi.string().trim().required().length(2)
    }),
})

/***************VALIDAÇÃO ATUALIZAÇÃO DE ONG******************* */
const putOng = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().trim().required()
    }).unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
})

/***************VALIDAÇÃO LISTAGEM CASOS DA ONG******************* */
const profile = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().trim().required()
    }).unknown()
})
/*****************VALIDAÇÃO CADASTRO DE CASO********************* */
const createIncidents = celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().trim().required()
    }).unknown(),
})

/***************VALIDAÇÃO LISTAGEM CASOS GERAIS******************* */
const listIncidents = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
})
/***********************EXXCLUSÃO DE INCIDENT********************** */
const deleteIncident = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})

const putIncident = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().trim().required()
    }).unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})
/******************************************************************* */

module.exports = {
    createOng,
    profile,
    createIncidents,
    listIncidents,
    deleteIncident,
    putOng,
    putIncident
}

