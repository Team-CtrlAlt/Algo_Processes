"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = __importDefault(require("web3"));
// import { RPC_URL } from "../config/stage";
var EthWeb3 = /** @class */ (function () {
    function EthWeb3() {
        this.RPC_URL = process.env.RPC_URL || "";
        console.log("this.RPC_URL =================>>> :", this.RPC_URL);
        this.web3 = new web3_1.default(this.RPC_URL);
    }
    return EthWeb3;
}());
var ethWeb3 = new EthWeb3();
exports.default = ethWeb3;
