import express from 'express'
import session from 'express-session'
import 'dotenv/config'
import {runConnection, insertUser, findUser} from './woanderDB.mjs'
import cors from 'cors';

const app = express()
const port = 8000

import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(cors());
app.use(session({
  secret: 'keyboard cat',      // stringa del middleware per marcare le chiamate
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 100000}
}))

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

app.post('/login', async (req, res) => {
  const user = req.body;
  let resultPromise = await findUser(user)

  try {
    if (resultPromise.username == user.username && resultPromise.password == user.password){
      req.session.user = user.username  
         res
            .status(201)
            .send({
              message: 'user authenticated'
         })
    }
  } catch (error) {
    res.status(403).send(`L'utente non esiste`);
  }
}) 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// creare collection nel db per: users, schede, liste (sono insiemi omogenei di dati), (itinerari forse)
// si connettono tra loro attraverso un id univoco, lo username, ecc