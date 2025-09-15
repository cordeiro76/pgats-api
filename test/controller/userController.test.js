const request = require('supertest');
const sinon = require ('sinon');
const { expect } = require('chai');

const app = require('../../rest/app')
const userService = require('../../src/services/userService')

describe('Checkout Controller', () => {
    describe( 'POST /api/users/login', () => {
        it('Quando é informado email ou senha invalidos recebo 401', async () => {
            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email: "jessica@test.com",
                    password: "Jessic@12345"
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error', 'Credenciais inválidas' )
        });

        it.only('Teste com mock: Quando é informado email ou senha invalidos recebo 401', async () => {
            const userServiceMock = sinon.stub(userService, 'authenticate');
            userServiceMock.returns(null);

            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email: "jessic@test.com",
                    password: "Jessic@12345"
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error', 'Credenciais inválidas');
            sinon.restore();
            
        });

    });
});