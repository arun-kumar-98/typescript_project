import Express from "express";
const app = Express()


import bodyParser, { BodyParser, urlencoded } from "body-parser";

import cors from 'cors'



import { router } from "./src/router";


app.use(urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.use('/', router)
 function run() {

    app.listen(`4000`, () => {
        console.log(`server listenig at port ${4000}`)
    })

}

run()


