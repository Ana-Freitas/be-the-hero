const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {

        const whatsapp = "5516999999999"
        expect(whatsapp).toMatch(/^[0-9]{10,13}$/);

        const response = await request(app)
            .post('/ongs')
            .send(
                {
                    name: "TESTE",
                    email: "teste@teste.com",
                    whatsapp: whatsapp,
                    city: "Araraquara",
                    uf: "SP"
                }
            );

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

        console.log(response.body);
    })

})