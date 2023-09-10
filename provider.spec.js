const path = require('path');
const { Verifier } = require('@pact-foundation/pact');

// Define the provider base URL
const providerBaseUrl = 'https://reqres.in';

// Define the Pact Verifier options
const opts = {
  provider: 'provider',
  providerBaseUrl,
  pactBrokerUrl: 'https://mandy.pactflow.io/', // Replace with your Pact Broker URL
  pactBrokerToken: 'mlrb2JMdEJv1M-nnop',
  publishVerificationResult: true,
  providerVersion: '1.0.0',
  pactUrls: [path.resolve(__dirname, './pacts/consumer-provider.json')], // Path to your Pact JSON file
};

// Verify the interactions
describe('Pact Verification', () => {
  it('should validate the interactions for /api/users/2', function() {
    this.timeout(10000);
    return new Verifier(opts).verifyProvider();

  });
});
