import React, { Component } from 'react';
import Web3 from 'web3'; // this is the thing that is deprecated
import Identicon from 'identicon.js';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if(window.ethereum) {
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
    this.setState({ account: accounts[0]})
    // Network ID
    const networkId = await web3.eth.net.getId()
    // console.log(networkId)
    const networkData = SocialNetwork.networks[networkId]
    if(networkData){
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
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
    // Address
    // ABI
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0,
      posts: []
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                { this.state.posts.map((post, key) => {
                  return(

                    <div className="card mb-4" key={key} >
                      <div className="card-header">
                        <img
                          className='mr-2'
                          width='30'
                          height='30'
                          src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                         />
                        <small className="text-muted">{post.author}</small>
                      </div>
                      <ul id="postList" className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p>{post.content}</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                          <small className="float-left mt-1 text-muted">
                            TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                          </small>
                          <button className="btn btn-link btn-sm float-right pt-0">
                            <span>
                              TIP 0.1 ETH
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>

                  )
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
