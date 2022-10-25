"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
// import { API_URL } from "./stage";
var server = axios_1.default.create({
    baseURL: process.env.API_URL,
});
exports.default = server;
