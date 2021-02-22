var Web3 = require('web3');

const web3 = new Web3('https://http-mainnet.hecochain.com')
const BigNumber = require('bignumber.js')
var api = require('../api/glable');

class glable {
   constructor (address,config) {
     this.address = address
     if (config == 'address') {
      this.web3 = new web3.eth.Contract(api.tokenApi, address );
     }  else {
      this.web3 = new web3.eth.Contract(api.ctokenApi, address );
     }
     this.decimals =  18
   }
   getDecimal = async () =>  {
    let str =  await this.web3.methods.decimals().call()
    this.decimals =  str
      return str;
  }
   setNumber = (number ,decimals ) => {
        var a =  new BigNumber(number).div(new BigNumber(10).pow(this.decimals)).toFixed()
        console.log(a);
        return a
      }
}
class Abi extends glable {
  constructor  (address,config) {
    super(address,config)
  }
  /****
   * 精度
   */
  getDecimals = async () =>  {
    let str =  await this.web3.methods.decimals().call()
      return str;
  }
  /****
   * 利率
   */
  supplyRatePerBlock  = async () => {
    let str = await this.web3.methods.supplyRatePerBlock().call()
    let supplyRatePerBlock = new BigNumber(str).times(new BigNumber(28800)).times(365).div(new BigNumber(10).pow(this.decimals)).times(100).toFixed(2)
    return supplyRatePerBlock
  }
  /****
   * 借款块
   */
  borrowRatePerBlock  = async () => {

    let str = await this.web3.methods.borrowRatePerBlock().call()
    let borrowRatePerBlock = new BigNumber(str).times(new BigNumber(28800)).times(365).div(new BigNumber(10).pow(this.decimals)).times(100).toFixed(2);
    return borrowRatePerBlock
  }
  /**
   * 存款总规模
   * @returns
   */
  getCash = async () => {
    let add =await this.web3.methods.getCash().call()
    console.log(add);
      return  this.setNumber(add)
  }
  
   /**
   * 借款总规模
   * @returns
   */
  totalBorrows = async () => {
    return this.setNumber(await this.web3.methods.totalBorrows().call())
    
  }

  userMintAmount = async (address) => {
    // balanceOfUnderlying
    return this.setNumber(await this.web3.methods.balanceOfUnderlying(address).call())
  }
  
  userBorrowAmount = async (address) =>{
    // borrowBalanceCurrent
    return this.setNumber(await this.web3.methods.borrowBalanceCurrent(address).call())
  }

}

  

/*********
 * @address 传入地址
 * @config   链接  默认链接ctoken api  传入address 链接token api
 * 
 */
  const initWeb3 =async (address,config)=> {
    return new Abi(address,config)
       
 }
 /**
  * Comptroller 风控合约
  */
 class Comptroller {
  constructor (address) {
     this.comptroller = new web3.eth.Contract(api.comptroller, address );
  }
  compRate = async () => {
    let tmp = await this.comptroller.methods.compRate().call()
    let compRate = new BigNumber(tmp).div(new BigNumber(10).pow(18)).toFixed()
    return compRate
  }

  //合约的价格
  getUnderlyingPrice = async(Address) =>{
    try {
      let oracle =await this.comptroller.methods.oracle().call()
      let oracle1 = await new web3.eth.Contract(api.oracle, oracle );
      let oracle2 = await oracle1.methods.getUnderlyingPrice(Address).call();
      console.log(oracle2);
      return  new BigNumber(oracle2).div(new BigNumber(10).pow(18)).toFixed()
    } catch (error) {
      console.log(error);
      return 0
    }
   
  }

  getHfPrice = async() =>{
    try {
      let oracle =await this.comptroller.methods.oracle().call()
      let oracle1 = await new web3.eth.Contract(api.oracle, oracle );
      let oracle2 = await oracle1.methods.getPrice('0x1daF05bcd669D914Dc991140e9f30436a02C1697').call();
      console.log(oracle2);
      return  new BigNumber(oracle2).div(new BigNumber(10).pow(18)).toFixed()
    } catch (error) {
      console.log(error);
      return 0
    }
   
  }



  /**
   * 
   * @param {} addres ctokenaddress 地址 质押率
   * @returns
   */
  market = async (addres) => {
    let market = await this.comptroller.methods.markets(addres).call();
    return new BigNumber(market.collateralFactorMantissa).div(new BigNumber(10).pow(18)).times(100).toFixed(2) *1
  }

  getAccount = async (address,resultArray) =>{
    let balanceArray = await this.comptroller.methods.getAccountLiquidity(address).call();
    let balance1 = new BigNumber(balanceArray[2]._hex, 16).toFixed()
    if(balance1 > 0){
     resultArray.push(address)
    }
    return resultArray
  }
 

}
 const Comptrollers = async (address)=>{
   return new Comptroller(address)
 }
 module.exports = {initWeb3,Comptrollers};