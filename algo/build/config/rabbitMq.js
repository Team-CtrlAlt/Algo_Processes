"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = __importStar(require("amqplib/callback_api"));
var logs_constants_1 = require("../constants/logs.constants");
// import { RABBIT_MQ } from "./stage";
var RabbitMq = /** @class */ (function () {
    function RabbitMq() {
        var _this = this;
        this.startServer = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                amqp.connect(process.env.RABBIT_MQ || "", function (err, conn) {
                    if (err)
                        console.log(logs_constants_1.LogsConstants.RABBIT_MQ_CONNECTION_FAILED, err);
                    console.log(logs_constants_1.LogsConstants.RABBIT_MQ_CONNECTED);
                    conn.createChannel(function (err, ch) {
                        if (err)
                            console.log(logs_constants_1.LogsConstants.RABBIT_MQ_CHANNEL_FAILED, err);
                        _this.channel = ch;
                        console.log(logs_constants_1.LogsConstants.RABBIT_MQ_CHANNEL_CREATED);
                    });
                });
                return [2 /*return*/];
            });
        }); };
        this.assertQueue = function (queueName) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.channel.assertQueue(queueName, { durable: false }, function (err, res) {
                    if (err)
                        console.log(logs_constants_1.LogsConstants.ASSERT_QUEUE_FAILED + " " + queueName);
                });
                return [2 /*return*/];
            });
        }); };
        this.sendToQueue = function (queueName, msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.channel.sendToQueue(queueName, msg);
                return [2 /*return*/];
            });
        }); };
        this.consumeQueue = function (queueName, cb) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("CONSUME QUEUE WORKING HERE");
                        return [4 /*yield*/, this.assertQueue(queueName)];
                    case 1:
                        _a.sent();
                        this.channel.prefetch(1);
                        this.channel.consume(queueName, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!msg)
                                            return [2 /*return*/];
                                        data = JSON.parse(msg.content.toString());
                                        return [4 /*yield*/, cb(data)];
                                    case 1:
                                        _a.sent();
                                        this.channel.ack(msg);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); };
        this.startServer();
    }
    return RabbitMq;
}());
exports.default = new RabbitMq();
