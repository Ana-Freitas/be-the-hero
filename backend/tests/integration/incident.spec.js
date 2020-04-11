const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection');


describe('Incident', () => {


    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new incident', async () => {
        const response = await request(app)
            .post('/incidents')
            .set('Authorization', '4852a5e2')
            .send(
                {
                    "title": "TESTE",
                    "description": "Banho e tosa gratuito para cães de rua",
                    "value": 1.99
                }
            );

        expect(response.body).toHaveProperty('id');

        console.log(response.body);
    })

})