describe('PUT Requests - Reqres API', () => {
    it('Should update a user', () => {
      cy.request('PUT', '/users/2', {
        name: 'morpheus',
        job: 'zion resident',
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'morpheus');
        expect(response.body).to.have.property('job', 'zion resident');
      });
    });
  });
  