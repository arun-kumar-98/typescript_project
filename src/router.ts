import { addUser, getAll, getOneRecord, removeRecord, bulkRecordInsertion, updateRecord } from "./userService";

import express from "express";


const router = express.Router()

router.post('/save', addUser)

router.get('/get', getAll)
router.post('/getOne', getOneRecord)
router.delete('/delete', removeRecord)

router.post('/bulkInsert', bulkRecordInsertion)

router.put('/updateName', updateRecord)

export { router }