const request = require('supertest');
const { expect, use } = require('chai');


describe('Testes de checkout com GraphQL', () => {
    beforeEach(async() => {
        const loginUser = require('../fixture/request/login/loginUser.json')
        const respostaLogin = await request('http://localhost:4000/graphql')
            .post('')
            .send(loginUser);
            token = respostaLogin.body.data.login.token;
    });

    it('Validar que é possível fazer o checkout', async () => {
        const checkout = require('../fixture/request/checkout/checkout.json')
        const respostaCheckout = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(checkout);

        expect(respostaCheckout.status).to.equal(200);


    });
    it('Verificar quando não é inserido os dados do cartao', async () => {
        const checkout = require('../fixture/request/checkout/checkout.json');
        delete checkout.variables.cardData;

        const respostaCheckout = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(checkout);

        expect(respostaCheckout.status).to.equal(200);

        expect(respostaCheckout.body).to.have.property('errors');
        expect(respostaCheckout.body.errors[0].message).to.equal('Dados do cartão obrigatórios para pagamento com cartão');

    });

});