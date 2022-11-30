import Express, { Request, Response } from "express";
import { ReplService } from "ts-node";
import { couldStartTrivia } from "typescript";

import { db } from "../db";

const records = db.collection("record");

const addUser = async (req: Request, res: Response) => {
  try {
    const resp = await records.insertOne(req.body);

    res.status(201).json({
      response: resp,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const resp = await records.find().toArray();
    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);

    res.send(error);
  }
};

const getOneRecord = async (req: Request, res: Response) => {
  try {
    const resp = await records.findOne({ firstName: req.body.where });

    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};


const removeRecord = async (req: Request, res: Response) => {
  try {
    const resp = await records.deleteOne({ firstName: req.body.firstName });

    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    res.send(error);
  }
};

const bulkRecordInsertion = async (req: Request, res: Response) => {
  try {
    const resp = await records.insertMany(req.body);
    res.status(201).json({ response: resp });
  } catch (error) {
    res.status(400).json({
      response: error,
    });
  }
};

const updateRecord = async (req: Request, res: Response) => {
  try {
    const name = req.body.firstName;
    const resp = await records.updateOne(
      { firstName: name },
      {
        $set: {
          email: req.body.email,
        },
      }
    );

    res.status(200).json({
      reponse: resp,
    });
  } catch (error) {
    res.status(400).json({
      reponse: error,
    });
  }
};


// code optimization
const recordData = async (req: Request, res: Response) => {
  try {
    let resp;

    //insert multiple record
    if (req.body && Array.isArray(req.body)) {
      resp = await records.insertMany(req.body);
    }
    //insert single object
    else if (req.body) {
      resp = await records.insertOne(req.body);
    } else {
      resp = "no new record to insert";
    }

    res.status(201).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: error,
    });
  }
};

//find record

//pagination

const fetchOneOrMultiple = async (req: Request, res: Response) => {
  try {
    let resp;
    let totalRecords;

    //count total records available
    if ((req.body.skip || req.body.skip === 0) && req.body.take) {
      console.log("inside if block");
      resp = await records
        .find(req.body.where)
        .limit(req.body.take)
        .skip(req.body.skip)
        .toArray();

      //count records

      totalRecords = await records.countDocuments();

      //For a fast count of the total documents in a collection
      //see Collection#estimatedDocumentCount estimatedDocumentCount.

      //console
      console.log(totalRecords);
    }
    //
    else if ((req.body.pages || req.body.pages == 0) && req.body.pageSize) {
      console.log("inside else if block ");

      resp = await records
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

      totalRecords = await records.estimatedDocumentCount();
      console.log(totalRecords);
    } else {
      resp = await records.find().toArray();
      console.log("inside else block");
    }

    res.status(200).json({
      response: resp,
      total: totalRecords,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: error,
    });
  }
};

//update one or many

const upateOneOrMany = async (req: Request, res: Response) => {
  try {
    let resp;
    req.body = req.body ? req.body : {};

    //fetch records
    let response = await records.find().toArray();
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
    resp = await records.bulkWrite(newRecord);

    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: error,
    });
  }
};

//find many by pattern

const findManyDocumentBySpecificKeyword = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body.keyword);

    const regex = req.body.keyword;
    console.log(regex);
    const resp = await records
      .find({
        firstName: { $regex: regex + ".*", $options: "i" },
      })
      .toArray();
    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: error,
    });
  }
};

//showing pages result

export {
  addUser,
  getAll,
  getOneRecord,
  removeRecord,
  bulkRecordInsertion,
  updateRecord,
  recordData,
  fetchOneOrMultiple,
  upateOneOrMany,
};
