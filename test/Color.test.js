const { assert } = require('chai')


const Celestial = artifacts.require('./Celestial.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()
contract('Celestial',(accounts)=>{
    let celestial
    before(async () =>{
        celestial = await Celestial.deployed()
    })
    describe('deployment', async()=>{
        it('Contract is deployed', async() =>{
            const address = celestial.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
            



        })

        it('the contract has the assigned name', async()=>{
            const name = await celestial.name()
            assert.equal(name,"Celestial")
        })
        it('the contract has the assigned symbol', async()=>{
            const symbol = await celestial.symbol()
            assert.equal(symbol,"CELESTIAL")
    })
})

describe("how we mint the tokens" , async()=>{
    it("confirms if a new token is created" , async()=>{
        const result = await celestial.mint('MARS')
        const totalSupply = await celestial.totalSupply()
        assert.equal(totalSupply,1)
    })  
        
        
    it("confirms if the tokenID is assigned to the correct person", async()=>{
        const owner = await celestial.ownerOf(1)
        assert.equal(owner,accounts[0]);
    })
    it("confirms if the tokencount of the person increases", async()=>{
        const balance = await celestial.balanceOf(accounts[0])
        assert.equal(balance,1);
    })
    it("confirms if its rejecting the repeating colors", async()=>{
        await celestial.mint('MARS').should.be.rejected;   
    })
})

describe("list of all celestials that have been minted",async()=>{
    it("lists all",async()=>{
        await celestial.mint('MERCURY')
        await celestial.mint('VENUS')
        await celestial.mint('JUPITER')
        const totalSupply = await celestial.totalSupply()
        let result = []
        let tempcelest
        for(var i = 0 ; i < totalSupply;i ++){
            tempcelest = await celestial.celestials(i)
            result.push(tempcelest)

        }
        let expected = ['MARS','MERCURY','VENUS','JUPITER']
        assert.equal(result.join(","),expected.join(","))





    
})
    

    
    

})
})