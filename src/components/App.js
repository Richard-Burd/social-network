import React, { Component } from 'react';
import Web3 from 'web3'; // this is the thing that is deprecated
import Identicon from 'identicon.js';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable() // deprecated notice in browser...https://github.com/MetaMask/detect-provider... use: "await window.eth_requestAccounts"
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected.  You should consider MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // load account
    const accounts = await web3.eth.getAccounts()
    // console.log(accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    // console.log(networkId)
    const networkData = SocialNetwork.networks[networkId]
    if (networkData){
      // console.log(networkId)
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      //console.log(socialNetwork)
      this.setState({ socialNetwork })  // ES6 shortcut for key: value that are the same: socialNetwork: socialNetwork
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      // console.log(postCount)
      // Load Posts
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post] //ES6 spread operator
        })
      }
      // console.log({ posts: this.state.posts })
      this.setState({ loading: false })
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
    // Address
    // ABI
  }

  createPost(content) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0,
      posts: [],
      loading: true
    }
    
    this.createPost = this.createPost.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
          { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Main
                posts={this.state.posts}
                createPost={this.createPost}
              />
          }
      </div>
    );
  }
}

export default App;
