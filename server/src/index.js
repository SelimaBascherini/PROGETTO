import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser' //Cookie-parser - used to parse cookie header to store data on the browser whenever a session is established on the server-side.
import 'dotenv/config'
import {runConnection, insertUser, findUser, insertTrip, findTrips} from './woanderDB.mjs'
import cors from 'cors';

const app = express()
const port = 8000

import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser());  //permette al server di salvare, leggere e avere accesso al cookie


//Si ha la necessità di utilizzare i cookie: ogni volta che il client
//effettuerà una chiamata, dovrà inviare anche i cookie che permettono
//al server di capire che quel determinato utente è in sessione (dopo il login)
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(session({
    secret: process.env.SECRETKEY_SESSION,  //stringa per autenticare la sessione
    saveUninitialized:true, 
    cookie: { maxAge: oneDay }, //tempo attivazione cookie. Dopodichè non sarà più inviato. 
    resave: false 
}));

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
      req.session.userid = req.body.username  
      console.log(req.session);
         res
            .status(201)
            .send({
              message: 'user authenticated'
         })
    }
  } catch (error) {
    res.status(403).send(`Invalid username or password`);
  }
}) 

app.post('/home/trip', async (req, res) => {
  const trip = req.body;
  let resultPromise = await insertTrip(trip)

  if (await resultPromise == 11000){
    res.status(409).send('Nome già utilizzato');
  } else {
      res
        .status(201)
        .send('Il viaggio è stato inserito correttamente')
  }
})  

app.get('/home', async(req,res) => {
  res.json(await findTrips())
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});
//fare la chiamata per la logout lato client

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// creare collection nel db per: users, schede, liste (sono insiemi omogenei di dati), (itinerari forse)
// si connettono tra loro attraverso un id univoco, lo username, ecc