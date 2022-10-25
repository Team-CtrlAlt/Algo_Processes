"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQQueues = void 0;
var RabbitMQQueues;
(function (RabbitMQQueues) {
    RabbitMQQueues["DEPOSIT_QUEUE_BLOCKS_PROCESS"] = "ETHDepositQueueBlocksProcess";
    RabbitMQQueues["WITHDRAW_QUEUE_BLOCKS_PROCESS"] = "ETHWithdrawQueueBlocksProcess";
    RabbitMQQueues["PENDING_WITHDRAWAL_TX_PROCESS"] = "ETHPendingWithdrawalQueueBlocksProcess";
    RabbitMQQueues["BTC_DEPOSIT_QUEUE_BLOCKS_PROCESS"] = "BTCDepositQueueBlocksProcess";
    RabbitMQQueues["BTC_WITHDRAW_QUEUE_BLOCKS_PROCESS"] = "BTCWithdrawQueueBlocksProcess";
    RabbitMQQueues["BTC_PENDING_WITHDRAWAL_TX_PROCESS"] = "BTCPendingWithdrawalQueueBlocksProcess";
    RabbitMQQueues["TRON_DEPOSIT_QUEUE_BLOCKS_PROCESS"] = "TRONDepositQueueBlocksProcess";
    RabbitMQQueues["TRON_WITHDRAW_QUEUE_BLOCKS_PROCESS"] = "TRONWithdrawQueueBlocksProcess";
    RabbitMQQueues["TRON_PENDING_WITHDRAWAL_TX_PROCESS"] = "TRONPendingWithdrawalQueueBlocksProcess";
})(RabbitMQQueues = exports.RabbitMQQueues || (exports.RabbitMQQueues = {}));
