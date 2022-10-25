/**
 * Redis  Configuration
 */
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
/**
 * Server Port
 */
export const SERVER_PORT  = process.env.SERVER_PORT;
export const BASE_URL = process.env.BASE_URL;
export const NGROK = "http://420f00862e02.ngrok.io";

/**
 * FCM Server key
 */

export const FCM_SERVER_KEY = "";

/**
 * Database Config
 */
export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT;

/**
 * AWS S3 access or secret key
 */
export const S3_ACCESSID = process.env.S3_ACCESSID;
export const S3_SECRETKEY = process.env.S3_SECRETKEY;
export const S3_BUCKET = process.env.S3_BUCKET;

/**
 * Twilio Configuration
 */
export const ACCOUNT_SID = process.env.ACCOUNT_SID;
export const AUTH_TOKEN = process.env.AUTH_TOKEN;
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
/**
 * TRON Config
 */
export const TRX_FULLNODE = "http://47.252.19.181:8090";
export const TRX_SOLIDITY = "http://47.252.19.181:8091";

/**
 * Infura Details
 */

export const RPC_URL: string = "http://13.56.253.187:8545";

//  'ETH_NODE': 'https://ropsten.infura.io/v3/560e8dc2788d4d46b53e96b80c729150',
export const ETH_GAS_PRICE: string = "1000000000"; //1 Gwe
export const ETH_TX_GAS_BUFFER: number = 1000;
export const ERC20_GAS_PRICE: string = "1000000000";
export const ERC20_TX_GAS_BUFFER: number = 1000;

/**
 * Bitcoin account URL
 */
export const FETCH_BTC_BALANCE: string = "https://api.blockcypher.com/v1/btc/main/addrs/";

export const BITCOIN_ACC_URL = "https://blockstream.info/testnet/api/address";

/**
 * BitCoin config
 */
export const BTC_NODE_CONFIG: {
  BTC_PROTOCOL: string;
  BTC_HOST: string;
  BTC_USER: string;
  BTC_PASS: string;
  BTC_PORT: string;
} = {
  BTC_PROTOCOL: "http",
  BTC_HOST: process.env.BTC_HOST,
  BTC_USER: process.env.BTC_USER,
  BTC_PASS: process.env.BTC_PASS,
  BTC_PORT: process.env.BTC_PORT,
};

/**
 * Blockcypher details
 */

export const BLOCKCYPHER_TOKEN = "031571aed7454723a3f858a21f14e26c";
export const BLOCKCYPHER_BASE_URL = "https://api.blockcypher.com/v1/btc/test3";

/**
 * RabbitMQ
 */
export const RABBIT_MQ = "amqp://guest:guest@con_rabbit";

export const staticCoinFamily: any = {
  algo:1
};

/**
 * JWT session
 */

export const JWT_SECRET = "2B4B6250655368566D5971337436773979244226452948404D635166546A576E";


export const JWT_SESSION = {
  session: false,
};

/**
 * ERC 20 Tokens standard ABI
 */

export const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "stop",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "INITIAL_SUPPLY",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_value", type: "uint256" }],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_subtractedValue", type: "uint256" },
    ],
    name: "decreaseApproval",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimalFactor",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "stopped",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "start",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_addedValue", type: "uint256" },
    ],
    name: "increaseApproval",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "ownerAdrs", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "burner", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "previousOwner", type: "address" },
      { indexed: true, name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];
