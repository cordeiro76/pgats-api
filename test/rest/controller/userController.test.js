const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../../rest/app')
const userService = require('../../../src/services/userService')

describe('User Controller', () => {
    describe('POST /api/users/register', () => {
        it('Quando é informado dados válidos é cadastrado e recebo 201', async () => {
            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "jessicaa",
                    email: "jessica_valid@test.com",
                    password: "Jessic@12345"
                });

            expect(resposta.status).to.equal(201);

            const respEsperada = require('../../fixture/responses/quandoInformoValores.json');
            expect(resposta.body).to.deep.equal(respEsperada);


        });

        it('Quando é informado email duplicado recebo 400', async () => {

            await request(app)
                .post('/api/users/register')
                .send({
                    name: "jessica",
                    email: "jessica_duplicado@test.com",
                    password: "Jessic@12345"
                });

            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "jessica",
                    email: "jessica_duplicado@test.com",
                    password: "Jessic@12345"
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Email já cadastrado');
        });

    });
});

describe('Checkout Controller - register (mock)', () => {
    let registerUserStub;

    afterEach(() => {
        sinon.restore();
    });

    it('Teste usando mock: Deve cadastrar usuário com dados válidos e retornar 201', async () => {
        const mockUser = {
            name: 'jessica_mock',
            email: 'jessica_mock@test.com',
            id: '123'
        };

        registerUserStub = sinon.stub(userService, 'registerUser').returns(mockUser);

        const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name: 'jessica_mock',
                email: 'jessica_mock@test.com',
                password: 'Jessic@12345'
            });

        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.have.property('user');
        expect(resposta.body.user).to.deep.equal(mockUser);
    });

    it('Teste usando mock: Deve retornar 400 quando email já estiver cadastrado', async () => {
        registerUserStub = sinon.stub(userService, 'registerUser').returns(null);

        const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name: 'jessica_duplicado',
                email: 'jessica_duplicado@test.com',
                password: 'Jessic@12345'
            });

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Email já cadastrado');
    });
});