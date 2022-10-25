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
var web3_helper_1 = __importDefault(require("../../helpers/web3.helper"));
var rabbitMq_1 = __importDefault(require("../../config/rabbitMq"));
var axios_1 = __importDefault(require("../../config/axios"));
var db_1 = __importDefault(require("../../config/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var EthTxStatusUpdateProcess = /** @class */ (function () {
    function EthTxStatusUpdateProcess() {
        var _this = this;
        // public webhook = "";
        this.startTxStatusUpdateQueue = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rabbitMq_1.default.consumeQueue(process.env.PENDING_WITHDRAWAL_TX_PROCESS || "", this.getTx)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getTx = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var _a, getTransaction, getTransactionReceipt, transaction, transactionReceipt, gasReverted, gasUsed, gasPrice, gasTotal, gasDiff, txUpdate, txUpdate, error_1, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = web3_helper_1.default.web3.eth, getTransaction = _a.getTransaction, getTransactionReceipt = _a.getTransactionReceipt;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, getTransaction(data.tx_id)];
                    case 2:
                        transaction = _b.sent();
                        return [4 /*yield*/, getTransactionReceipt(data.tx_id)];
                    case 3:
                        transactionReceipt = _b.sent();
                        if (!transaction.blockNumber) return [3 /*break*/, 7];
                        gasReverted = void 0;
                        gasUsed = transactionReceipt.gasUsed
                            ? transactionReceipt.gasUsed
                            : 0;
                        gasPrice = parseFloat(transaction.gasPrice) || 0;
                        gasTotal = transaction.gas || 0;
                        if (gasTotal > 0 && gasUsed > 0) {
                            gasDiff = gasTotal - gasUsed;
                            gasReverted = gasPrice * gasDiff;
                        }
                        if (!(transactionReceipt.status && transaction.blockHash != null)) return [3 /*break*/, 5];
                        txUpdate = {
                            coin_id: data.coin_id,
                            status: "success",
                            txid: transaction.hash,
                            gasReverted: gasReverted,
                            fromAddress: transactionReceipt.from.toLowerCase(),
                        };
                        return [4 /*yield*/, this.sendTxUpdate(txUpdate)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!!transactionReceipt.status) return [3 /*break*/, 7];
                        txUpdate = {
                            coin_id: data.coin_id,
                            status: "failed",
                            txid: transaction.hash,
                            gasReverted: gasReverted,
                            fromAddress: transactionReceipt.from.toLowerCase(),
                        };
                        return [4 /*yield*/, this.sendTxUpdate(txUpdate)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        message = error_1.message;
                        console.log("catch error getTx:", message);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.sendTxUpdate = function (txData) { return __awaiter(_this, void 0, void 0, function () {
            var currencyQuery, currency, webHookUrlApi, updatedUrl, finalApiUrl, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        currencyQuery = "SELECT IF(is_token=1, token_address, coin_symbol) as coin_symbol FROM coins WHERE coin_id = " + txData.coin_id;
                        return [4 /*yield*/, db_1.default.db.query(currencyQuery, {
                                type: sequelize_1.default.QueryTypes.SELECT,
                            })];
                    case 1:
                        currency = _a.sent();
                        webHookUrlApi = process.env.WEBHOOK_API_WITHDRAW_CONFIRMED_PROCESS || "";
                        updatedUrl = webHookUrlApi.replace(":coin", currency[0].coin_symbol);
                        finalApiUrl = process.env.API_URL + updatedUrl;
                        // this.webhook = finalApiUrl;
                        return [4 /*yield*/, axios_1.default.post(finalApiUrl, txData)];
                    case 2:
                        // this.webhook = finalApiUrl;
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        error_2 = _a.sent();
                        message = error_2.message;
                        return [2 /*return*/, console.log("catch error sendTxUpdate: ", message)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return EthTxStatusUpdateProcess;
}());
var ethTxStatusUpdateProcess = new EthTxStatusUpdateProcess();
exports.default = ethTxStatusUpdateProcess;
