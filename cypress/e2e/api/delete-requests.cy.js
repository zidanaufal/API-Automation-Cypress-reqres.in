describe('DELETE Requests - Reqres API', () => {
    it('Should delete a user', () => {
      cy.request('DELETE', '/users/2').then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });
  