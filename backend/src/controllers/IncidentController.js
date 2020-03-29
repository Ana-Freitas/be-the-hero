const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return response.json({ id });
    },

    async read(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('incidents').count();
        console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) //esquema de paginação
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        /*Primeiro temos que buscar o caso, selecionando o id da ong, para que
        possamos assegurar que o caso que elaquer excluir é realmente dela/ */
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')

        /* Aqui verificamos se a ONG logada é a mesma encontrada no caso que ela quer excluir*/

        if (!incident) {
            return response.status(404).json({ error: "Incident not found." });
        }

        if (incident.ong_id != ong_id) {
            /*caso não seja, mudamos o status da requisição: 401 -> Unauthorization */
            return response.status(401).json({ error: "Operation not permitted." });
        }
        await connection('incidents').where('id', id).delete();
        /* 204 -> Not Content, significa que deletou com sucesso, mas não há nada para mostrar */
        return response.status(204).send();
    }
}