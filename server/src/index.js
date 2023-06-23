import express from 'express'
import session from 'express-session'
import 'dotenv/config'
import {runConnection, insertUser} from './woanderDB.mjs'
import cors from 'cors';

const app = express()
const port = 3000

import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(cors());

runConnection()  //connect to DB

app.post('/signup', async (req, res) => {
  const user = req.body;
  let resultPromise = await insertUser(user)

  if (await resultPromise == 11000){
    res.status(409).send('Username non disponibile');
  } else {
      res
        .status(201)
        .send('Lo user è stato creato correttamente')
  }
  }) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// creare collection nel db per: users, schede, liste (sono insiemi omogenei di dati), (itinerari forse)
// si connettono tra loro attraverso un id univoco, lo username, ecc