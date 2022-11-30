import * as userService from "./userService";

import express from "express";

const router = express.Router();

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

export { router };
