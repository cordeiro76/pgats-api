const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../rest/app')
const userService = require('../../src/services/checkoutService')

describe('Checkout Controller', () => {
    describe.only('POST /api/checkout', () => {

        beforeEach(async () => {
            const respostaLogin = await request(app)
                .post('/api/users/login')
                .send({
                    "email": "alice@email.com",
                    "password": "123456"
                });
            
                token = respostaLogin.body.token;

        });

        it('Quando é informado dados válidos recebo 200', async () => {
            const resposta = await request(app)
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    items: [
                        {
                            productId: 2,
                            quantity: 1
                        }
                    ],
                    freight: 11,
                    paymentMethod: "boleto",
                    cardData: {
                        number: "4455223355",
                        name: "jessica",
                        expiry: "06/06",
                        cvv: "123"
                    }

                });

            expect(resposta.status).to.equal(200);

        });
    });
});