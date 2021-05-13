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
      assert.equal(name, 'Dapp University Social Network')
    })
  })

  describe('posts', async () => {
    let result, postCount

    it('creates posts', async () => {
      result = await socialNetwork.createPost('This is my first post', { from: author })
      postCount = await socialNetwork.postCount()

      // SUCCESS
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is my first post', 'contrent is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')
      // console.log(event)
      // this would print out a bunch of stuff including the logs
      // console.log(result)

      // FAILURE: Post must have content
      await socialNetwork.createPost('', { from: author }).should.be.rejected
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