// import the being tested
const SocialNetwork = artifacts.require('./SocialNetwork.sol')

// Chai assertion library
require('chai')
  .use(require('chai-as-promised'))
  .should()

// Mocha testing framework comes bundled with Truffle

// callback function
// 'accounts' is an array provided by Ganache
contract('SocialNetwork', (accounts) => {
  // simple test to see if it was deployed to the blockchain
  let socialNetwork

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      // if the address is there, then it deployed
      socialNetwork = await SocialNetwork.deployed()
      const address = await socialNetwork.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
})
