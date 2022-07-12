const baseUrl= '';
const email='';
const password='';


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
