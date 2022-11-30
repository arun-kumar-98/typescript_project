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
exports.upateOneOrMany = exports.fetchOneOrMultiple = exports.recordData = exports.updateRecord = exports.bulkRecordInsertion = exports.removeRecord = exports.getOneRecord = exports.getAll = exports.addUser = void 0;
const db_1 = require("../db");
const records = db_1.db.collection("record");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield records.insertOne(req.body);
        res.status(201).json({
            response: resp,
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
            response: resp,
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
        const resp = yield records.findOne({ firstName: req.body.where });
        res.status(200).json({
            response: resp,
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
            response: resp,
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
            response: error,
        });
    }
});
exports.bulkRecordInsertion = bulkRecordInsertion;
const updateRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.firstName;
        const resp = yield records.updateOne({ firstName: name }, {
            $set: {
                email: req.body.email,
            },
        });
        res.status(200).json({
            reponse: resp,
        });
    }
    catch (error) {
        res.status(400).json({
            reponse: error,
        });
    }
});
exports.updateRecord = updateRecord;
/// TODO:
// const updateMany = async (req: Request, res: Response) => {
//     try {
//         const resp=await records.updateMany()
//     } catch (error) {
//         res.status(400).json({
//             response: error
//         })
//     }
// }
// code optimization
const recordData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp;
        //insert multiple record
        if (req.body && Array.isArray(req.body)) {
            resp = yield records.insertMany(req.body);
        }
        //insert single object
        else if (req.body) {
            resp = yield records.insertOne(req.body);
        }
        else {
            resp = "no new record to insert";
        }
        res.status(201).json({
            response: resp,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            response: error,
        });
    }
});
exports.recordData = recordData;
//find record
//pagination
const fetchOneOrMultiple = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp;
        let totalRecords;
        //count total records available
        if ((req.body.skip || req.body.skip === 0) && req.body.take) {
            console.log("inside if block");
            resp = yield records
                .find(req.body.where)
                .limit(req.body.take)
                .skip(req.body.skip)
                .toArray();
            //count records
            totalRecords = yield records.countDocuments();
            //For a fast count of the total documents in a collection
            //see Collection#estimatedDocumentCount estimatedDocumentCount.
            //console
            console.log(totalRecords);
        }
        //
        else if ((req.body.pages || req.body.pages == 0) && req.body.pageSize) {
            console.log("inside else if block ");
            resp = yield records
                .find({
                $or: [
                    {
                        firstName: { $regex: ".*" + req.body.firstNameStartWith + ".*" },
                    },
                    {
                        lastName: { $regex: ".*" + req.body.lastNameStartWith + ".*" },
                    },
                    {
                        email: { $regex: ".*" + req.body.emailStartWith + ".*" },
                    },
                ],
            })
                .skip(req.body.pages)
                .limit(req.body.pageSize)
                .toArray();
            totalRecords = yield records.estimatedDocumentCount();
            console.log(totalRecords);
        }
        else {
            resp = yield records.find().toArray();
            console.log("inside else block");
        }
        res.status(200).json({
            response: resp,
            total: totalRecords,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            response: error,
        });
    }
});
exports.fetchOneOrMultiple = fetchOneOrMultiple;
//update one or many
const upateOneOrMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp;
        req.body = req.body ? req.body : {};
        //fetch records
        let response = yield records.find().toArray();
        let newRecord = response.map(function (record) {
            return {
                updateOne: {
                    filter: {
                        firstName: record.firstName,
                    },
                    update: {
                        $set: {
                            email: record.firstName + record.lastName + "@tectoro.com",
                        },
                    },
                },
            };
        });
        resp = yield records.bulkWrite(newRecord);
        res.status(200).json({
            response: resp,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            response: error,
        });
    }
});
exports.upateOneOrMany = upateOneOrMany;
//find many by pattern
const findManyDocumentBySpecificKeyword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.keyword);
        const regex = req.body.keyword;
        console.log(regex);
        const resp = yield records
            .find({
            firstName: { $regex: regex + ".*", $options: "i" },
        })
            .toArray();
        res.status(200).json({
            response: resp,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            response: error,
        });
    }
});
