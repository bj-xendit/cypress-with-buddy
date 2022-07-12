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


