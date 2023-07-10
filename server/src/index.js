import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser' //Cookie-parser - used to parse cookie header to store data on the browser whenever a session is established on the server-side.
import cors from 'cors';  
import 'dotenv/config'
import {runConnection, insertUser, findUser, insertTrip, findTrips, insertElement, deleteTrips, deleteElement, editElement, editTrip} from './woanderDB.mjs'

const app = express()
const port = 8000

import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser());  //permette al server di salvare, leggere e avere accesso al cookie


//Si ha la necessità di utilizzare i cookie: ogni volta che il client
//effettuerà una chiamata, dovrà inviare anche i cookie che permettono
//al server di capire che quel determinato utente è in sessione (dopo il login)
//session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SECRETKEY_SESSION,  //stringa per autenticare la sessione
    saveUninitialized:true, 
    cookie: { maxAge: oneDay }, //tempo attivazione cookie. Dopodichè non sarà più inviato. 
    resave: false 
}));

runConnection() 

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
          .send({message: 'user authenticated'})
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

app.put('/home/:name', async (req,res) => {  //passo anche all'URL la variabile
  const elementName = req.params.name; //recupero name: Bali
  const newElement = req.body; // recupero element {'item':'spazzolino', 'quantity':'2'}
  let result = await insertElement(elementName, newElement)
  res.status(201).end()
})

app.put('/home/:name/elements/:oldItem/:oldQuantity', async (req,res) =>{
  const elementName = req.params.name
  const oldItem = req.params.oldItem
  const oldQuantity = req.params.oldQuantity
  const newElement = req.body; //recupero edited item e edited quantity 
  let result = await editElement(elementName, oldItem, oldQuantity, newElement)
  res.status(201).end()
})

app.put('/home/edit/:name', async (req, res) =>{
  const oldTripName = req.params.name
  const newTrip = req.body
  let result = await editTrip (oldTripName, newTrip)
  res.status(201).end()
})

app.get('/home/trips', async(req,res) => {
  res.json(await findTrips())
});

app.delete('/home/:tripDeleted', async (req, res) =>{
  const tripDeleted = req.params.tripDeleted
  let result = await deleteTrips(tripDeleted)
  res.status(201).end()
}) 

app.delete('/home/:name/elements/:deletedItem/:deletedQuantity', async (req, res) =>{
  const name = req.params.name
  const deletedItem = req.params.deletedItem
  const deletedQuantity = req.params.deletedQuantity
  let result = await deleteElement(name, deletedItem, deletedQuantity )
  res.status(201).end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})