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
var logs_constants_1 = require("../../constants/logs.constants");
var sequelize_1 = __importDefault(require("sequelize"));
var db_1 = __importDefault(require("../../config/db"));
var process_helper_1 = __importDefault(require("./process.helper"));
var rabbitMq_1 = __importDefault(require("../../config/rabbitMq"));
var algosdk_1 = __importDefault(require("algosdk"));
var ETHBlocksProcess = /** @class */ (function () {
    function ETHBlocksProcess() {
        var _this = this;
        this.readBlocks = function () { return __awaiter(_this, void 0, void 0, function () {
            var getBlockNumber, latestBlock, lastBlockToProcess, lastBlockProcessed, error_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.algodClient.status().do()];
                    case 1:
                        getBlockNumber = _a.sent();
                        if (getBlockNumber === undefined) {
                            throw new Error("Unable to get node status");
                        }
                        latestBlock = getBlockNumber["last-round"];
                        lastBlockToProcess = latestBlock - this.minBlockConfirmation;
                        return [4 /*yield*/, process_helper_1.default.getLastBlockProcessed(lastBlockToProcess)];
                    case 2:
                        lastBlockProcessed = (_a.sent());
                        if (!lastBlockProcessed)
                            return [2 /*return*/, console.log("No block present in redis")];
                        console.table({
                            LATEST_BLOCK: latestBlock,
                            MIN_BLOCK_PROCESSED: lastBlockToProcess,
                            LAST_BLOCK_PROCESSED: lastBlockProcessed,
                            BLOCK_DIFFERENCE: latestBlock - lastBlockProcessed,
                        });
                        if (!(lastBlockProcessed <= lastBlockToProcess)) return [3 /*break*/, 5];
                        return [4 /*yield*/, process_helper_1.default.updateLastBlockProcessed(lastBlockProcessed)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getTxFromBlock(lastBlockProcessed)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, console.log(logs_constants_1.LogsConstants.BLOCK_NUMBER_EXCEEDING)];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        message = error_1.message;
                        console.log("catch error readBlocks:", message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getTxFromBlock = function (blockId) { return __awaiter(_this, void 0, void 0, function () {
            var TRX_RPC_URL, indexerClient, blockInfo, blockTx, error_2, message;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        TRX_RPC_URL = process.env.ALGO_RPC_TRANSACTION;
                        indexerClient = new algosdk_1.default.Indexer(this.token, TRX_RPC_URL, "");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, indexerClient.lookupBlock(blockId).do()];
                    case 2:
                        blockInfo = _a.sent();
                        blockTx = blockInfo.transactions;
                        blockTx.forEach(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getTxDetail(tx, blockId)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        message = error_2.message;
                        console.log("catch error getTxFromBlock:", message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getTxDetail = function (trnx, blockNumber) { return __awaiter(_this, void 0, void 0, function () {
            var amount, objData, amount, objData, error_3, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(trnx["payment-transaction"] != undefined)) return [3 /*break*/, 2];
                        amount = trnx["payment-transaction"].amount;
                        objData = {
                            txId: trnx.id,
                            fromAddress: trnx.sender,
                            toAddress: trnx["payment-transaction"].receiver,
                            token: null,
                            amount: amount,
                            blockId: blockNumber,
                        };
                        return [4 /*yield*/, this.checkAddressInDB(objData)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(trnx["asset-transfer-transaction"] != undefined)) return [3 /*break*/, 4];
                        amount = trnx["asset-transfer-transaction"].amount;
                        objData = {
                            txId: trnx.id,
                            fromAddress: trnx.sender,
                            toAddress: trnx["asset-transfer-transaction"].receiver,
                            token: trnx["asset-transfer-transaction"]["asset-id"],
                            amount: amount,
                            blockId: blockNumber,
                        };
                        return [4 /*yield*/, this.checkAddressInDB(objData)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        message = error_3.message;
                        console.log("catch error getTxDetail:", message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.checkAddressInDB = function (txData) { return __awaiter(_this, void 0, void 0, function () {
            var depositTxQuery, withdrawalTxQuery, depositQuery, withdrawalQuery, error_4, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        depositTxQuery = "SELECT id from wallets where wallet_address LIKE '" + txData.toAddress + "' LIMIT 1";
                        withdrawalTxQuery = "SELECT id from wallets where wallet_address LIKE '" + txData.fromAddress + "' LIMIT 1";
                        return [4 /*yield*/, db_1.default.db.query(depositTxQuery, {
                                type: sequelize_1.default.QueryTypes.SELECT,
                            })];
                    case 1:
                        depositQuery = _a.sent();
                        if (!(depositQuery.length > 0)) return [3 /*break*/, 3];
                        console.log("Found the user in to (DEPOSIT) tx 😸");
                        console.log("process.env.DEPOSIT_QUEUE_BLOCKS_PROCESS :", process.env.DEPOSIT_QUEUE_BLOCKS_PROCESS);
                        return [4 /*yield*/, this.addTxToQueue(txData, process.env.DEPOSIT_QUEUE_BLOCKS_PROCESS)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, db_1.default.db.query(withdrawalTxQuery, {
                            type: sequelize_1.default.QueryTypes.SELECT,
                        })];
                    case 4:
                        withdrawalQuery = _a.sent();
                        if (!(withdrawalQuery.length > 0)) return [3 /*break*/, 6];
                        console.log("Found the user in FROM (WITHDRAW) tx 😸");
                        console.log("withdrawalQuery:", withdrawalQuery);
                        return [4 /*yield*/, this.addTxToQueue(txData, process.env.WITHDRAW_QUEUE_BLOCKS_PROCESS)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        message = error_4.message;
                        console.log("checkAddressInDB", message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.addTxToQueue = function (data, queueName) { return __awaiter(_this, void 0, void 0, function () {
            var error_5, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, rabbitMq_1.default.assertQueue(queueName)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, rabbitMq_1.default.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        message = error_5.message;
                        console.log("addTxToQueue", message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.RPC_URL = process.env.ALGO_RPC;
        this.token = {
            "X-API-Key": process.env.ALGO_X_API_KEY,
        };
        this.algodClient = new algosdk_1.default.Algodv2(this.token, this.RPC_URL, "");
        this.minBlockConfirmation = Number(process.env.MIN_BLOCK_CONFORMATIONS);
    }
    return ETHBlocksProcess;
}());
var ethBlocksProcess = new ETHBlocksProcess();
exports.default = ethBlocksProcess;
