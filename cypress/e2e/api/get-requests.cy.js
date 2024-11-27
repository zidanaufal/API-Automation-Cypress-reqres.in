describe('GET Requests - Reqres API', () => {
    it('Should fetch a list of users', () => {
      cy.request('GET', '/users?page=2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
      });
    });
  
    it('Should fetch a single user', () => {
      cy.request('GET', '/users/2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('id', 2);
      });
    });
  
    it('Should return 404 for a non-existent user', () => {
      cy.request({
        method: 'GET',
        url: '/users/23',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  