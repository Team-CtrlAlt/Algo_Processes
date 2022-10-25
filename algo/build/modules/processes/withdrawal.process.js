"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var logs_constants_1 = require("../../constants/logs.constants");
// import { configuration } from "../../config";
var db_1 = __importDefault(require("../../config/db"));
var rabbitMq_1 = __importDefault(require("../../config/rabbitMq"));
var axios_1 = __importDefault(require("../../config/axios"));
var ETHWithdrawProcess = /** @class */ (function () {
    function ETHWithdrawProcess() {
        var _this = this;
        this.startWithdrawQueue = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rabbitMq_1.default.consumeQueue(process.env.WITHDRAW_QUEUE_BLOCKS_PROCESS, this.checkIfOurTx)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.checkIfOurTx = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var account, queryIfToken, queryIfBnb, webhookTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.token) return [3 /*break*/, 2];
                        queryIfToken = "SELECT * FROM coins AS co INNER JOIN wallets AS wa ON wa.coin_id=co.coin_id WHERE co.token_address='" + data.token + "' AND wa.wallet_address LIKE '" + data.fromAddress + "' AND co.coin_family=" + process.env.COIN_FAMILY + " LIMIT 1";
                        return [4 /*yield*/, db_1.default.db.query(queryIfToken, {
                                type: sequelize_1.default.QueryTypes.SELECT,
                            })];
                    case 1:
                        account = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        queryIfBnb = "SELECT * FROM coins AS co INNER JOIN wallets AS wa ON wa.coin_id=co.coin_id WHERE co.coin_symbol='" + process.env.NETWORK + "' AND wa.wallet_address LIKE '" + data.fromAddress + "' AND co.coin_family=" + process.env.COIN_FAMILY + " LIMIT 1";
                        return [4 /*yield*/, db_1.default.db.query(queryIfBnb, {
                                type: sequelize_1.default.QueryTypes.SELECT,
                            })];
                    case 3:
                        account = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(account.length > 0)) return [3 /*break*/, 6];
                        webhookTx = {
                            coin: {
                                coinId: account[0].coin_id,
                                coinFamily: account[0].coin_family,
                                tokenAddress: account[0].token_address,
                            },
                            isContract: account[0].is_token,
                            tx_id: data.txId,
                            to: data.toAddress,
                            from_address: data.fromAddress,
                            block_id: data.blockId,
                            amount: data.amount,
                        };
                        return [4 /*yield*/, this.addTransactionToDB(webhookTx)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        console.log(logs_constants_1.LogsConstants.NOT_OUR_WALLET + " " + data.txId);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.addTransactionToDB = function (transaction) { return __awaiter(_this, void 0, void 0, function () {
            var tokenAddress, webHookUrlApi, updatedUrl, finalApiUrl, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tokenAddress = process.env.NETWORK;
                        if (transaction.isContract == 1) {
                            tokenAddress = transaction.coin.tokenAddress;
                        }
                        webHookUrlApi = process.env.WEBHOOK_API_WITHDRAW_BLOCK_PROCESS || "";
                        updatedUrl = webHookUrlApi.replace(":coin", tokenAddress);
                        finalApiUrl = process.env.API_URL + updatedUrl;
                        return [4 /*yield*/, axios_1.default.post(finalApiUrl, transaction)];
                    case 1:
                        _a.sent();
                        console.log("Withdraw Transaction successfully added to DB POST " + finalApiUrl);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("catch error withdraw addTransactionToDB :", error_1);
                        console.log("Withdraw already exists in the database please check the transaction deposit table");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ETHWithdrawProcess;
}());
var ethDepositProcess = new ETHWithdrawProcess();
exports.default = ethDepositProcess;
