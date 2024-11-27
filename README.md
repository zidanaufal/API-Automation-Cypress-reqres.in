# Cypress
### _Cypress API Automation for Reqres.in_



Automated testing for the Reqres API using Cypress. This guide explains the steps to set up and run API tests for all available endpoints.

## 1. Setup Cypress
### Prerequites:
- Ensure Node.js and npm are installed on your system.

### Steps:
1. Create a new project and install Cypress:
```sh
mkdir cypress-api-automation
cd cypress-api-automation
npm init -y
npm install cypress --save-dev
```
2. Open Cypress to initialize the project:
```sh
mkdir -p cypress/e2e/api

```

3. Create a folder to organize API test files:
```sh
npx cypress open
```

## 2. Configure Cypress
Create and configure the Cypress base URL in `cypress.config.js` cypress.config.js at the root of the project:

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://reqres.in/api', // Base URL for the Reqres API
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
```

## 3. Write Tests for All Endpoints
### a. GET Requests
File: `cypress/e2e/api/get-requests.cy.js`
```javascript
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
  
```

### b. POST Request
File: `cypress/e2e/api/post-requests.cy.js`
```javascript
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
```

### c. PUT Request
File: `cypress/e2e/api/put-requests.cy.js`
```javascript
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
````

### d. DELETE Request
File: `cypress/e2e/api/delete-requests.cy.js`
```javascript
describe('DELETE Requests - Reqres API', () => {
    it('Should delete a user', () => {
      cy.request('DELETE', '/users/2').then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });
  
```

## 4. Running the Tests
### Run Tests via Cypress Interface:
Open Cypress from the terminal:
```
npx cypress open
```
> Select the desired test file to run from the Cypress interface.

## 5. Project Structure
The final project structure should look like this:
```
cypress-api-automation/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── get-requests.cy.js
│   │   │   ├── post-requests.cy.js
│   │   │   ├── put-requests.cy.js
│   │   │   └── delete-requests.cy.js
├── cypress.config.js
├── node_modules/
├── package.json
└── README.md
```

### Notes
- For more information about Cypress, refer to the [Cypress Documentation].
- To explore the API endpoints, visit [Reqres API Documentation].


   [Reqres API Documentation]: <https://reqres.in/>
   [Cypress Documentation]: <https://docs.cypress.io/app/get-started/why-cypress>
