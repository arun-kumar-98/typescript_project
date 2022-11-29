"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const userService_1 = require("./userService");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
router.post('/save', userService_1.addUser);
router.get('/get', userService_1.getAll);
router.post('/getOne', userService_1.getOneRecord);
router.delete('/delete', userService_1.removeRecord);
router.post('/bulkInsert', userService_1.bulkRecordInsertion);
router.put('/updateName', userService_1.updateRecord);
