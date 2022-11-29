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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecord = exports.bulkRecordInsertion = exports.removeRecord = exports.getOneRecord = exports.getAll = exports.addUser = void 0;
const db_1 = require("../db");
const records = db_1.db.collection('record');
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield records.insertOne(req.body);
        res.status(201).json({
            response: resp
        });
    }
    catch (error) {
        res.send(error);
    }
});
exports.addUser = addUser;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield records.find().toArray();
        res.status(200).json({
            response: resp
        });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.getAll = getAll;
const getOneRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield records.findOne({ firstName: req.body.firstName });
        res.status(200).json({
            response: resp
        });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.getOneRecord = getOneRecord;
const removeRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield records.deleteOne({ firstName: req.body.firstName });
        res.status(200).json({
            response: resp
        });
    }
    catch (error) {
        res.send(error);
    }
});
exports.removeRecord = removeRecord;
const bulkRecordInsertion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield records.insertMany(req.body);
        res.status(201).json({ response: resp });
    }
    catch (error) {
        res.status(400).json({
            response: error
        });
    }
});
exports.bulkRecordInsertion = bulkRecordInsertion;
const updateRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.firstName;
        const resp = yield records.updateOne({ firstName: name }, {
            $set: {
                email: req.body.email
            }
        });
        res.status(200).json({
            reponse: resp
        });
    }
    catch (error) {
        res.status(400).json({
            reponse: error
        });
    }
});
exports.updateRecord = updateRecord;
