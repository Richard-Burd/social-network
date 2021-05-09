// import the being tested
const SocialNetwork = artifacts.require('./SocialNetwork.sol')

// Chai assertion library
require('chai')
  .use(require('chai-as-promised'))
  .should()

// Mocha testing framework comes bundled with Truffle

// callback function
// 'accounts' is an array provided by Ganache
contract('SocialNetwork', ([deployer, author, tipper]) => {
  // simple test to see if it was deployed to the blockchain
  let socialNetwork

before(async () => {
  socialNetwork = await SocialNetwork.deployed()
})


  describe('deployment', async () => {
    it('deploys successfully', async () => {
      // if the address is there, then it deployed
      // socialNetwork = await SocialNetwork.deployed()...abstracted above^
      const address = await socialNetwork.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      // socialNetwork = await SocialNetwork.deployed()...abstracted above^
      const name = await socialNetwork.name()
      assert.equal(name, 'dapp university social network')
    })
  })

  describe('posts', async () => {
    let result, postCount

    it('creates posts', async () => {
      result = await socialNetwork.createPost('This is my first post', { from: author })
      postCount = await socialNetwork.postCount()
      // SUCCESS
      assert.equal(postCount, 1)
    })

//    it('lists posts', async () => {
//      // TODO: fill this in
//    })
//
//    it('allows users to tip posts', async () => {
//      // TODO: fill this in
//    })
  })
})
