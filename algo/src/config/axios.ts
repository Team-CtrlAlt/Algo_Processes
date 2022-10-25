import axios from "axios";
// import { API_URL } from "./stage";

const server = axios.create({
  baseURL: process.env.API_URL,
});

export default server;
