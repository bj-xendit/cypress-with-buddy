const baseUrl= Cypress.env('baseUrl');
const email=Cypress.env('email');
const password=Cypress.env('password');


var token;
var cartItem;
var cartItemVariant;
describe('Login with email',()=>{
it('login user - POST',()=>{
cy.request('POST', baseUrl + '/api/auth/email',{
    "email":email,
    "password":password
}).then(function(response){
    cy.wrap(response.body.token).should('not.be.empty');
    cy.log(response.body.token);
    token = response.body.token;
})

})});

describe('Get product list',()=>{
    it('get product list - GET ',()=>
    cy.request({
        
        method:'GET',
        url: baseUrl + '/api/v2/product',
        headers:{
            'x-session-token':token
        }
}
).then((response)=>{

    cy.log('total item ' + response.body.total)
    cy.wrap(response.body.total).should('be.gt',0);
     cartItem =  response.body.data[0].id;
     cartItemVariant = response.body.data[0].variants[0].id;


    }))});



describe('Create order',()=>{
    it('create order - POST',()=>{

        cy.request({
            headers:{
                'x-session-token': token
            },
            method:'POST',
url:
            
          baseUrl  +  '/api/v2/order',
           body:{
            
            
                "cart": [
                    {
                                  "item_id": cartItem,
                                  "item_variant_id": cartItemVariant,
                                  "item_name": "Test name",
                                  "item_variant_name": "Test variant",
                                  "quantity": 1,
                                  "price": 10000
                              }
                          ],
                          "discount": 0,
                          "total_cart_price": 10000,
                          "total_price": 100,
                          "currency": "IDR",
                "shipment": {
                  "sender": {
                    "first_name": "john",
                    "address": {
                      "address": "testaddress"
                    }
                  },
                  "recipient": {
                    "mobile_phone": "+629000000000",
                    "first_name": "Test One"
                  },
                  "method": "MERCHANT_ARRANGED",
                  "fee": 0.0
                },
                "total_cart_price": 100000.0,
                "payment": {
                  "type": "PAYMENT_LINK"
                }
              }
          
        }

        ).then((response)=>{
          cy.wrap(response.body.id).should('not.be.empty');
        })

        })
    })
