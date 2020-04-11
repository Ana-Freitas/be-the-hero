const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body
        const id = generateUniqueId();
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id });
    },

    async put(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const ong = await connection('ongs')
            .where('id', id)
            .select('*')
            .first();

        if (!ong) {
            return response.status(404).json({ error: "Ong not found." });
        }

        if (ong.id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted." });
        }

        const { name, email, whatsapp, city, uf } = request.body
        await connection('ongs').where('id', ong.id)
            .update({
                name,
                email,
                whatsapp,
                city,
                uf
            })

        return response.json({ "ID": `${ong.id}`, "Message": "Updated Successfully!" });
    },
    async read(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    }
}
