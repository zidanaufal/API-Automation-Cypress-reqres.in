describe('POST Requests - Reqres API', () => {
    it('Should create a new user', () => {
      cy.request('POST', '/users', {
        name: 'morpheus',
        job: 'leader',
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name', 'morpheus');
        expect(response.body).to.have.property('job', 'leader');
      });
    });
  
    it('Should login a user successfully', () => {
      cy.request('POST', '/login', {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });
  
    it('Should fail login with missing password', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: { email: 'eve.holt@reqres.in' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Missing password');
      });
    });
  });
  