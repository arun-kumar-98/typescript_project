"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongodb_1 = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new mongodb_1.MongoClient(url);
const db = client.db('ts');
exports.db = db;
