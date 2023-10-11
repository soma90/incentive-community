require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_ADDRESS || 'http://127.0.0.1:7545'));
const { sendEther } = require('./web3.common.services');
const { getBalance, approve, postSet } = require('./web3.erc20.services');
const { mintSet } = require('./web3.erc721.services');
const { getPostData } = require('./web3.datastore.services');
const { erc20abi, erc721abi} = require('../common/abi');
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CONTRACT_ADDRESS);
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDRESS);
const newAccount = "0x99eae5745A2e76F24C56D20A12059A1959cF04Cf";


const { setToken } = require('./web3.erc721.services');

const init = async () => {
  try {
    await setToken(process.env.ERC20_CONTRACT_ADDRESS);
    //await setNFT(process.env.ERC721_CONTRACT_ADDRESS);
    //await postSetToken(process.env.ERC20_CONTRACT_ADDRESS);
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }    
}

(async () => {
  // await init();
  // await sendEther(newAccount, "10");
  // balance1 = await web3.eth.getBalance(newAccount);
  // console.log(balance1);

  //const tokenAmount = 10;

  // post컨트랙트 PgenerateNewPost 에서 mintNFT를 호출하는경우
  // await approve(process.env.POST_CONTRACT_ADDRESS, 50, process.env.SERVER_ADDRESS);
  // const allRe = await erc20Contract.methods.allowance(process.env.SERVER_ADDRESS, process.env.POST_CONTRACT_ADDRESS).call();
  // console.log(allRe);
  // await PgenerateNewPost(newAccount, tokenAmount, process.env.SERVER_ADDRESS) 

  ////
  // await postSet(newAccount, tokenAmount);
  // const bal = await getBalance(newAccount);
  // console.log(bal);

  ///
  // await approve(process.env.ERC721_CONTRACT_ADDRESS, tokenAmount, newAccount, "1234");
  // await mintSet(newAccount, "tokenURI");
  // const ownerRe = await erc721Contract.methods.ownerOf(9).call();
  // console.log(ownerRe);
  // const balRe = await erc721Contract.methods.balanceOf(newAccount).call();
  // console.log(balRe);

  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  // const getPost = await getPostData(0); //체인데이터 저장 확인
  // console.log(getPost);
})();
