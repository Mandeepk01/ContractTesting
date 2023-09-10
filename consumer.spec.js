const assert = require('assert')
const { Pact, Matchers } = require('@pact-foundation/pact')
const { eachLike } = Matchers
const get = require('./get')

describe('Pact with Order API', () => {
  const provider = new Pact({
    port: 8082,
    consumer: 'consumer',
    provider: 'provider',
  })

  before(() => provider.setup())
  after(() => provider.finalize())

  describe('when a call to the API is made', () => {
    before(async () => {
      return provider.addInteraction({
        state: 'There are some users',
        uponReceiving: 'a request to retrieve user',
        withRequest: {
          path: '/api/users/2',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {"data":{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}},
        },
      })
    })

    it('Ok Response', async () => {
      const customHeaders = {
        'Content-Type': 'application/json'
      };
      get(customHeaders)
        .then((response) => {
          assert.strictEqual(response.status, 200)
          expect(response.data).toEqual({"data":{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}});
        })
    })
  })
})
