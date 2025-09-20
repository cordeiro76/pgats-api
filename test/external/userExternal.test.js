const request = require('supertest');
const { expect } = require('chai');

describe('Checkout Controller', () => {
    describe('POST /api/users/register', () => {
        it('Quando é informado dados válidos, o usuário é cadastrado e recebo 201', async () => {
            const emailUnico = `jessica_${new Date().getTime()}@test.com`;

            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "jessica",
                    email: emailUnico,
                    password: "Jessic@12345"
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('user');
            expect(resposta.body.user).to.have.property('name', 'jessica');
            expect(resposta.body.user).to.have.property('email', emailUnico);
        });
    });
});