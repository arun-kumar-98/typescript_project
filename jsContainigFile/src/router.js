"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const userService = __importStar(require("./userService"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
router.post("/save", userService.addUser);
router.get("/get", userService.getAll);
router.post("/getOne", userService.getOneRecord);
router.delete("/delete", userService.removeRecord);
router.post("/bulkInsert", userService.bulkRecordInsertion);
router.put("/updateName", userService.updateRecord);
//optimized code router
router.post("/set", userService.recordData);
router.post("/getting", userService.fetchOneOrMultiple);
router.post("/oneOrManyUpdate", userService.upateOneOrMany);
