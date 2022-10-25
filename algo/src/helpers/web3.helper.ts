import Web3 from "web3";
// import { RPC_URL } from "../config/stage";

class EthWeb3 {
  public RPC_URL: string;
  public web3: Web3;

  constructor() {
    this.RPC_URL = process.env.RPC_URL || "";
    console.log("this.RPC_URL =================>>> :",this.RPC_URL)

    this.web3 = new Web3(this.RPC_URL);
  }
}

const ethWeb3 = new EthWeb3();
export default ethWeb3;
