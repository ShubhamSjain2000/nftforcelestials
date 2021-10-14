import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Celestial from '../abis/Celestial.json';


class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const account = await web3.eth.getAccounts()
    //console.log(account)
    this.setState({ account: account[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Celestial.networks[networkId]
    if (networkData) {
      const abi = Celestial.abi
      const address = networkData.address
      //console.log(address)
      const contract = new web3.eth.Contract(abi, address)
      //console.log(contract)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      //console.log(totalSupply)
      this.setState({ totalSupply })

      //const abcd = await contract.celestials


      //console.log()
      //console.log("pam")
      // Load Colors
      const lists = []
      for (var i = 1; i <= totalSupply; i++) {
        const abcd = await contract.methods.celestials(i - 1).call()
        //const abcd = await contract.methods.celestials()
        lists.push(abcd)
        this.setState({
          celestials: [...this.state.celestials, abcd]
        })
      }
      console.log(this.state.celestials)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (celestial) => {
    console.log("called mint")
    this.state.contract.methods.mint(celestial).send({ from: this.state.account })

      .once('receipt', (receipt) => {
        this.setState({
          celestials: [...this.state.celestials, celestial]
        })
      })
  }



  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      celestials: []
    }
  }
  render() {
    return (
      <>
        <nav className="navbar background">
          <ul className="nav-list">
            <div className="logo">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/NFT_Icon.png/480px-NFT_Icon.png" />
            </div>
            <li><a href="#web">View all tokens</a></li>
            <li><a href="#program">Get tokens</a></li>

          </ul>
          <p style={{ color: "white" }}> Your Address =  {this.state.account}</p>
        </nav>

        <section className="firstsection">
          <div className="box-main">
            <div className="firstHalf">
              <h1 className="text-big" id="web">
                NFT - Non fungible tokens
              </h1>


              <p className="text-small">
                “Non-fungible” more or less means that it’s unique and can’t be replaced with something else. For example, a bitcoin is fungible — trade one for another bitcoin, and you’ll have exactly the same thing. A one-of-a-kind trading card, however, is non-fungible. If you traded it for a different card, you’d have something completely different.
              </p>


            </div>
          </div>
        </section>

        <section className="secondsection">
          <div className="box-main">
            <div className="secondHalf">
              <h1 className="text-big" id="program">
                All tokens that have been minted:
              </h1>
              {this.state.celestials.map(celestial => (
                <li>
                  {celestial}
                </li>
              ))}












            </div>
          </div>
        </section>

        <section className="section">
          <div className="paras">
            <h1 className="sectionTag text-big">Mint tokens</h1>

            <div class="form">
              <form onSubmit={(event) => {
                event.preventDefault()
                const celestial = this.celestial.value
                this.mint(celestial)
              }} >
                <div class="title">Get NFT</div>

                <div class="input-container ic1">
                  <input id="firstname" class="input" type="text" placeholder=" " ref={(input) => this.celestial = input} />
                  <div class="cut"></div>
                  <label for="firstname" class="placeholder">Enter the celestial you want to mint</label>
                </div>


                <input type="submit" class="submit" />
              </form>
            </div>


          </div>

        </section>

        <footer className="background">
          <p className="text-footer">

          </p>


        </footer>


      </>

    )

  }
}

export default App;
