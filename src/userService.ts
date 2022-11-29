import Express, { Request, Response } from "express";
import { ReplService } from "ts-node";

import { db } from "../db";



const records = db.collection('record')


const addUser = async (req: Request, res: Response) => {


    try {
        const resp = await records.insertOne(req.body)

        res.status(201).json({
            response: resp
        })

    } catch (error) {
        res.send(error)

    }

}


const getAll = async (req: Request, res: Response) => {

    try {

        const resp = await records.find().toArray();
        res.status(200).json({
            response: resp
        })

    } catch (error) {
        console.log(error)

        res.send(error)

    }

}


const getOneRecord = async (req: Request, res: Response) => {
    try {

        const resp = await records.findOne({ firstName: req.body.firstName })

        res.status(200).json({
            response: resp
        })

    } catch (error) {
        console.log(error)
        res.send(error)

    }
}



const removeRecord = async (req: Request, res: Response) => {
    try {

        const resp = await records.deleteOne({ firstName: req.body.firstName })

        res.status(200).json({
            response: resp
        })

    } catch (error) {
        res.send(error)
    }
}


const bulkRecordInsertion = async (req: Request, res: Response) => {
    try {

        const resp = await records.insertMany(req.body)
        res.status(201).json({ response: resp })

    } catch (error) {
        res.status(400).json({
            response: error
        })

    }
}

const updateRecord = async (req: Request, res: Response) => {
    try {

        const name = req.body.firstName
        const resp = await records.updateOne({ firstName: name }, {
            $set: {
                email: req.body.email
            }

        })

        res.status(200).json({
            reponse: resp
        })

    } catch (error) {
        res.status(400).json({
            reponse: error
        })

    }

}


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




export { addUser, getAll, getOneRecord, removeRecord, bulkRecordInsertion, updateRecord }