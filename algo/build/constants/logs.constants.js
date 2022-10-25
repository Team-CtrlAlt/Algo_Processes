"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsConstants = void 0;
var LogsConstants;
(function (LogsConstants) {
    LogsConstants["RABBIT_MQ_CONNECTED"] = "\uD83D\uDE06 Successfully connected to RabbitMQ server";
    LogsConstants["RABBIT_MQ_CHANNEL_CREATED"] = "\uD83D\uDE06 RabbitMQ channel created successfully";
    LogsConstants["RABBIT_MQ_CONNECTION_FAILED"] = "\uD83D\uDCA9 Failed to connect to RabbitMQ server.";
    LogsConstants["RABBIT_MQ_CHANNEL_FAILED"] = "\uD83D\uDCA9 Failed to create channel.";
    LogsConstants["ASSERT_QUEUE_FAILED"] = "\uD83D\uDCA9 Failed to assert queue:- ";
    LogsConstants["NOT_OUR_WALLET"] = "\uD83D\uDCA9 Not our exchange wallet ";
    LogsConstants["BLOCK_NUMBER_EXCEEDING"] = "\uD83D\uDCA5 Running ahead of current blockchain";
})(LogsConstants = exports.LogsConstants || (exports.LogsConstants = {}));
